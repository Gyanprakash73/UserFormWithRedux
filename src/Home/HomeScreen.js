import {
  Alert,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeStyles from './HomeStyles';
import GlobalVariable from '../Assets/Styles/GlobalColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../Assets/Images';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch, connect} from 'react-redux';
import {addUser} from '../Redux/Reducer';
import notifee from '@notifee/react-native';

const {Empty} = Images;

const {
  container,
  appBarView,
  appBarText,
  logoutTO,
  createBtnTO,
  createBtnText,
  emptyImage,
  itemView,
  itemInnerView,
  image,
  leftItemView,
  rightItemView,
  titleText,
  rightText,
  itemInnerView1,
  titleText1,
  deleteIconView,
} = HomeStyles;

const Home = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state?.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userDetails != '') {
      // console.log('userDetails----', userDetails);
      setData(userDetails);
    }
  }, [userDetails]);

  const getData = async () => {
    try {
      let result = await AsyncStorage.getItem('Users');
      //  console.log('first', result);
      if (result !== null) {
        setData(JSON.parse(result));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    let sportsArrayAsString = item.sportsName.join(', ');
    return (
      <View style={itemView}>
        <View style={itemInnerView}>
          <View style={leftItemView}>
            <Image source={{uri: item.imageUri}} style={image} />
          </View>
          <View style={rightItemView}>
            <Text style={titleText}>
              {'Name : '}
              <Text style={rightText}>
                {item.firstName + ' ' + item.lastName}
              </Text>
            </Text>
            <Text style={titleText}>
              {'Gender : '}
              <Text style={rightText}>{item.gender}</Text>
            </Text>
            <Text style={titleText}>
              {'Phone No : '}
              <Text style={rightText}>{item.phoneNo}</Text>
            </Text>
          </View>
        </View>
        <View style={itemInnerView1}>
          <View>
            <Text style={titleText1}>
              {'Email : '}
              <Text style={rightText}>{item.email}</Text>
            </Text>
            <Text style={titleText1}>
              {'Sports : '}
              <Text style={rightText}>{sportsArrayAsString}</Text>
            </Text>
            <Text style={titleText1}>
              {'Address : '}
              <Text style={rightText}>{item.address}</Text>
            </Text>
          </View>
          <View style={deleteIconView}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('UserFormScreen', {PhoneNo: item.phoneNo})
              }>
              <FontAwesome
                name="edit"
                size={25}
                color={GlobalVariable.COLOR.BLACK}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingTop: '50%'}}
              activeOpacity={0.5}
              onPress={() => deleteClick(item.phoneNo)}>
              <AntDesign
                name="delete"
                size={25}
                color={GlobalVariable.COLOR.DELETE}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const deleteClick = PhoneNumber => {
    Alert.alert('Warning!', 'Are you sure you want to delete?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => onPressDelete(PhoneNumber),
      },
    ]);
  };

  const onPressDelete = PhoneNumber => {
    let result = data.filter(item => item.phoneNo != PhoneNumber);
    setData(result);
    AsyncStorage.setItem('Users', JSON.stringify(result));
    dispatch(addUser(result));
    onDisplayNotification();
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
      title: 'Delete',
      body: 'User deleted successfully',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const warningShow = () => {
    Alert.alert('Warning!', 'Are you sure you want to logout?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => onPressLogout(),
      },
    ]);
  };

  const onPressLogout = () => {
    AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  return (
    <View style={container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={GlobalVariable.COLOR.APPBAR}
      />
      <View style={appBarView}>
        <Text style={appBarText}>Dashboard</Text>
        <TouchableOpacity
          style={logoutTO}
          onPress={() => warningShow()}
          activeOpacity={0.7}>
          <MaterialIcons
            name="logout"
            size={25}
            color={GlobalVariable.COLOR.WHITE}
          />
        </TouchableOpacity>
      </View>
      {data.length != 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{flex: 1}}>
          <Image source={Empty} style={emptyImage} />
        </View>
      )}
      <TouchableOpacity
        style={createBtnTO}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('UserFormScreen', {PhoneNo: null})}>
        <Text style={createBtnText}>Create User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
