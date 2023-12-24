import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Alert,
  Linking,
  TextInput,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import GlobalVariable from '../Assets/Styles/GlobalColor';
import UserFormStyles from './UserFormStyles';
import {Images} from '../Assets/Images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-kill-app';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RadioButton} from 'react-native-paper';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {addUser} from '../Redux/Reducer';
import notifee from '@notifee/react-native';

const {width, height} = Dimensions.get('window');

const {Avater} = Images;

const {
  container,
  appBarView,
  appBarBackTO,
  appBarText,
  profileImageView,
  profileImage,
  profileCamera,
  rbSheetView,
  rbSheetTO,
  rbSheetLG,
  rbSheetText,
  inputName,
  genderMainView,
  genderView,
  genderMaleView,
  genderMaleText,
  genderFemaleView,
  dropdownView,
  dropdown,
  placeholderStyle,
  selectedTextStyle,
  iconStyle,
  itemTextStyle,
  selectedStyle,
  createBtnTO,
  createBtnText,
} = UserFormStyles;

const data = [
  {label: 'Hockey', value: '1'},
  {label: 'Tennis', value: '2'},
  {label: 'Volleyball', value: '3'},
  {label: 'Table Tennis', value: '4'},
  {label: 'Baseball', value: '5'},
  {label: 'Golf', value: '6'},
  {label: 'Basketball', value: '7'},
  {label: 'Football', value: '8'},
];

const UserFormScreen = props => {
  const {PhoneNo} = props.route.params;
  const refRBSheetCamera = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [gender, setGender] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isSportsFocus, setIsSportsFocus] = useState(false);

  useEffect(() => {
    if (PhoneNo != null) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      let result = await AsyncStorage.getItem('Users');
      //  console.log('first', result);
      if (result !== null) {
        let data = JSON.parse(result);
        let finalData = data.find(item => item.phoneNo == PhoneNo);
        //  console.log('finalData', finalData);
        setFirstName(finalData.firstName);
        setLastName(finalData.lastName);
        setPhoneNo(finalData.phoneNo);
        setEmail(finalData.email);
        setAddress(finalData.address);
        setGender(finalData.gender);
        setImageUri(finalData.imageUri);
        setSelected(finalData.sports);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the Camera');
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.warn(err);
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    let permission = '';
    if (DeviceInfo.getSystemVersion() >= 13) {
      permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    } else {
      permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(permission);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the Storage');
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.warn(err);
      }
    } else return true;
  };

  const captureImage = async () => {
    /* let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
      noData: true,
      videoQuality: 'high',
      durationLimit: 10, //Video max duration in seconds
      saveToPhotos: true,
      storageOptions: {
        path: 'videos',
        skipBackup: true
      }
    }; */

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.5,
      },
    };
    let isCameraPermitted = await requestCameraPermission();
    if (isCameraPermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          //  alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.assets[0].uri);
        // console.log('width -> ', response.assets[0].width);
        // console.log('height -> ', response.assets[0].height);
        // console.log('fileSize -> ', response.assets[0].fileSize);
        // console.log('type -> ', response.assets[0].type);
        // console.log('fileName -> ', response.assets[0].fileName);
        setImageUri(response.assets[0].uri);
      });
    } else {
      Alert.alert(
        'Hold!',
        "Without camera access we will not be able to detect your camera.\n\nPlease tap on 'Settings' then 'App Permissions' and then on 'Camera' to allow access.",
        [
          {
            text: 'Exit',
            onPress: () => RNExitApp.exitApp(),
          },
          {
            text: 'Settings',
            onPress: () => {
              Linking.openSettings(), RNExitApp.exitApp();
            },
          },
        ],
      );
    }
  };

  const chooseFile = async () => {
    /* let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
      videoQuality: 'high',
      durationLimit: 10,
    }; */

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.5,
      },
    };

    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      launchImageLibrary(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          //   alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.assets[0].base64);
        // console.log('uri -> ', response.assets[0].uri);
        // console.log('width -> ', response.assets[0].width);
        // console.log('height -> ', response.assets[0].height);
        // console.log('fileSize -> ', response.assets[0].fileSize);
        // console.log('type -> ', response.assets[0].type);
        // console.log('fileName -> ', response.assets[0].fileName);
        setImageUri(response.assets[0].uri);
      });
    } else {
      Alert.alert(
        'Hold!',
        "Without storage access we will not be able to detect your storage.\n\nPlease tap on 'Settings' then 'App Permissions' and then on 'Photos and videos' to allow access.",
        [
          {
            text: 'Exit',
            onPress: () => RNExitApp.exitApp(),
          },
          {
            text: 'Settings',
            onPress: () => {
              Linking.openSettings(), RNExitApp.exitApp();
            },
          },
        ],
      );
    }
  };

  const emailValidate = text => {
    //   console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      return false;
    } else {
      console.log('Email is Correct');
      return true;
    }
  };

  const onPressCreate = () => {
    if (imageUri === null) {
      showMessage({
        message: 'Error',
        description: 'Please select image',
        type: 'danger',
      });
    } else if (firstName === null || firstName.trim() === '') {
      showMessage({
        message: 'Error',
        description: 'Please enter first name',
        type: 'danger',
      });
    } else if (lastName === null || lastName.trim() === '') {
      showMessage({
        message: 'Error',
        description: 'Please enter last name',
        type: 'danger',
      });
    } else if (selected.length == 0) {
      showMessage({
        message: 'Error',
        description: 'Please select sports',
        type: 'danger',
      });
    } else if (gender === null) {
      showMessage({
        message: 'Error',
        description: 'Please select gender',
        type: 'danger',
      });
    } else if (phoneNo === null || phoneNo.trim() === '') {
      showMessage({
        message: 'Error',
        description: 'Please enter phone number',
        type: 'danger',
      });
    } else if (phoneNo.trim().length !== 10) {
      showMessage({
        message: 'Error',
        description: 'Please enter valid phone number',
        type: 'danger',
      });
    } else if (email === null || email.trim() === '') {
      showMessage({
        message: 'Error',
        description: 'Please enter email',
        type: 'danger',
      });
    } else if (!emailValidate(email)) {
      showMessage({
        message: 'Error',
        description: 'Please enter valid email',
        type: 'danger',
      });
    } else if (address === null || address.trim() === '') {
      showMessage({
        message: 'Error',
        description: 'Please enter address',
        type: 'danger',
      });
    } else {
      saveData();
    }
  };

  const saveData = async () => {
    let sportsName = sportsNameFilter(selected);
    await AsyncStorage.getItem('Users', (err, result) => {
      let ItemData = {
        imageUri: imageUri,
        firstName: firstName,
        lastName: lastName,
        sports: selected,
        sportsName: sportsName,
        gender: gender,
        phoneNo: phoneNo,
        email: email,
        address: address,
      };
      if (PhoneNo != null) {
        let newIds = JSON.parse(result);
        let objIndex = newIds.findIndex(obj => obj.phoneNo == PhoneNo);
        newIds[objIndex].imageUri = imageUri;
        newIds[objIndex].firstName = firstName;
        newIds[objIndex].lastName = lastName;
        newIds[objIndex].sports = selected;
        newIds[objIndex].sportsName = sportsName;
        newIds[objIndex].gender = gender;
        newIds[objIndex].phoneNo = phoneNo;
        newIds[objIndex].email = email;
        newIds[objIndex].address = address;
        AsyncStorage.setItem('Users', JSON.stringify(newIds));
        dispatch(addUser(newIds));
      } else {
        if (result !== null) {
          var newIds = JSON.parse(result).concat(ItemData);
          AsyncStorage.setItem('Users', JSON.stringify(newIds));
          dispatch(addUser(newIds));
        } else {
          var firstItem = [ItemData];
          AsyncStorage.setItem('Users', JSON.stringify(firstItem));
          dispatch(addUser(firstItem));
        }
      }
    });
    onDisplayNotification();
    navigation.goBack();
  };

  const sportsNameFilter = selected => {
    return data
      .filter(item => selected.includes(item.value))
      .map(item => item.label);
  };

  const onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    // Display a notification
    await notifee.displayNotification({
      title: PhoneNo != null ? 'Updated' : 'Created',
      body:
        PhoneNo != null
          ? 'User updated successfully'
          : 'User created successfully',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return (
    <View style={container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={GlobalVariable.COLOR.APPBAR}
      />
      <FlashMessage icon="auto" position="top" duration={3000} />
      <View style={appBarView}>
        <TouchableOpacity
          style={appBarBackTO}
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <Ionicons
            color={GlobalVariable.COLOR.WHITE}
            name={'arrow-back'}
            size={25}
          />
        </TouchableOpacity>
        <Text style={appBarText}>User Registration</Text>
      </View>
      <ScrollView
        contentContainerStyle={{paddingBottom: '5%'}}
        showsVerticalScrollIndicator={false}>
        <View style={profileImageView}>
          <Image
            source={imageUri === null ? Avater : {uri: imageUri}}
            style={profileImage}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => refRBSheetCamera.current.open()}
            style={profileCamera}>
            <Ionicons
              name="camera"
              size={45}
              color={GlobalVariable.COLOR.CCC}
            />
          </TouchableOpacity>
          <RBSheet
            ref={refRBSheetCamera}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={height / 2.6}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: GlobalVariable.COLOR.CCC,
              },
              container: {
                backgroundColor: GlobalVariable.COLOR.EFEFEF,
              },
            }}>
            <View style={rbSheetView}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={rbSheetTO}
                onPress={() => {
                  refRBSheetCamera.current.close(), captureImage();
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    GlobalVariable.COLOR.APPBAR,
                    GlobalVariable.COLOR.APPBAR,
                  ]}
                  style={rbSheetLG}>
                  <Text style={rbSheetText}>Take Photo</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={rbSheetTO}
                onPress={() => {
                  refRBSheetCamera.current.close(), chooseFile();
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    GlobalVariable.COLOR.APPBAR,
                    GlobalVariable.COLOR.APPBAR,
                  ]}
                  style={rbSheetLG}>
                  <Text style={rbSheetText}>Choose File</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={rbSheetTO}
                onPress={() => refRBSheetCamera.current.close()}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={[
                    GlobalVariable.COLOR.NORMALGREY,
                    GlobalVariable.COLOR.NORMALGREY,
                  ]}
                  style={rbSheetLG}>
                  <Text style={rbSheetText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </RBSheet>
        </View>
        <TextInput
          value={firstName}
          style={inputName}
          placeholder={'First name'}
          onChangeText={textInputName => setFirstName(textInputName)}
          keyboardType="default"
          returnKeyType="next"
          onSubmitEditing={() => {
            firstTextInput.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          ref={input => {
            firstTextInput = input;
          }}
          value={lastName}
          style={inputName}
          placeholder={'Last name'}
          onChangeText={textInputName => setLastName(textInputName)}
          keyboardType="default"
          returnKeyType="next"
          onSubmitEditing={() => {
            secondTextInput.focus();
          }}
          blurOnSubmit={false}
        />
        <View style={dropdownView}>
          <MultiSelect
            style={dropdown}
            placeholderStyle={placeholderStyle}
            selectedTextStyle={selectedTextStyle}
            iconStyle={iconStyle}
            itemTextStyle={itemTextStyle}
            selectedStyle={selectedStyle}
            search={false}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select sports"
            value={selected}
            onChange={item => {
              setSelected(item);
            }}
            onFocus={() => setIsSportsFocus(true)}
            onBlur={() => setIsSportsFocus(false)}
            renderRightIcon={() => (
              <Ionicons
                color={GlobalVariable.COLOR.BLACK}
                name={isSportsFocus ? 'chevron-up' : 'chevron-down'}
                size={20}
              />
            )}
          />
        </View>
        <View style={genderMainView}>
          <RadioButton.Group
            onValueChange={newValue => setGender(newValue)}
            value={gender}>
            <View style={genderView}>
              <View style={genderMaleView}>
                <Text style={genderMaleText}>Male</Text>
                <RadioButton
                  value="male"
                  uncheckedColor={GlobalVariable.COLOR.UNCHECKED}
                  color={GlobalVariable.COLOR.CHECKED}
                />
              </View>
              <View style={genderFemaleView}>
                <Text style={genderMaleText}>Female</Text>
                <RadioButton
                  value="female"
                  uncheckedColor={GlobalVariable.COLOR.UNCHECKED}
                  color={GlobalVariable.COLOR.CHECKED}
                />
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <TextInput
          ref={input => {
            secondTextInput = input;
          }}
          value={phoneNo}
          style={inputName}
          placeholder={'Phone number'}
          onChangeText={textInputName => setPhoneNo(textInputName)}
          keyboardType="numeric"
          maxLength={10}
          returnKeyType="next"
          onSubmitEditing={() => {
            thirdTextInput.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          ref={input => {
            thirdTextInput = input;
          }}
          value={email}
          style={inputName}
          placeholder={'Email'}
          onChangeText={textInputName => setEmail(textInputName)}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            fourthTextInput.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          ref={input => {
            fourthTextInput = input;
          }}
          value={address}
          style={{...inputName, height: 100, textAlignVertical: 'top'}}
          placeholder={'Address'}
          onChangeText={textInputName => setAddress(textInputName)}
          keyboardType="default"
          multiline={true}
        />
        <TouchableOpacity
          style={createBtnTO}
          activeOpacity={0.7}
          onPress={() => onPressCreate()}>
          <Text style={createBtnText}>
            {PhoneNo != null ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UserFormScreen;
