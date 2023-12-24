import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import LoginStyles from './LoginStyles';
import FlashMessage from 'react-native-flash-message';
import {showMessage} from 'react-native-flash-message';
import GlobalVariable from '../Assets/Styles/GlobalColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const {
  container,
  headerView,
  loginView,
  loginText,
  noteView,
  noteText,
  inputView,
  input,
  loginBtnTO,
  loginBtnText,
} = LoginStyles;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [UserName, setUserName] = useState(null);
  const [Password, setPassword] = useState(null);
  const [viewShow, setViewShow] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token', (error, result) => {
      if (result) {
        navigation.replace('HomeScreen');
      }
    });
    setTimeout(() => {
      setViewShow(true);
    }, 1000);
  }, []);

  const onLoginPress = () => {
    if (UserName === null) {
      showMessage({
        message: 'Error',
        description: 'Please enter user name',
        type: 'danger',
      });
    } else if (Password === null) {
      showMessage({
        message: 'Error',
        description: 'Please enter password',
        type: 'danger',
      });
    } else if (UserName !== 'balert') {
      showMessage({
        message: 'Error',
        description: 'Please enter correct user name',
        type: 'danger',
      });
    } else if (Password !== '12345') {
      showMessage({
        message: 'Error',
        description: 'Please enter correct password',
        type: 'danger',
      });
    } else {
      AsyncStorage.setItem('token', '1');
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    }
  };

  return (
    <View style={container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={GlobalVariable.COLOR.WHITE}
      />
      <FlashMessage icon="auto" position="top" duration={3000} />
      {viewShow && (
        <ScrollView>
          <View style={loginView}>
            <Text style={loginText}>{'Login'}</Text>
            <View style={noteView}>
              <Text style={noteText}>{'Note:-'}</Text>
              <Text
                style={
                  noteText
                }>{`Please enter username as "balert"\nand password as "12345" to login`}</Text>
            </View>
            <View style={inputView}>
              <TextInput
                style={input}
                onChangeText={UserName => setUserName(UserName)}
                value={UserName}
                placeholder="User name"
                keyboardType="default"
                maxLength={10}
                autoFocus={true}
                returnKeyType="next"
                onSubmitEditing={() => {
                  firstTextInput.focus();
                }}
                blurOnSubmit={false}
              />
            </View>
            <View style={inputView}>
              <TextInput
                ref={input => {
                  firstTextInput = input;
                }}
                style={input}
                onChangeText={Password => setPassword(Password)}
                value={Password}
                placeholder="Password"
                keyboardType="default"
                maxLength={10}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={loginBtnTO}
              activeOpacity={0.5}
              onPress={() => onLoginPress()}>
              <Text style={loginBtnText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default LoginScreen;
