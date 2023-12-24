import {View, Text} from 'react-native';
import React from 'react';
import MainNavigator from './src/Navigator/MainNavigator';
import {Provider as StateProvider} from 'react-redux';
import store from './src/Redux/Store';

const App = () => {
  return (
    <StateProvider store={store}>
      <MainNavigator />
    </StateProvider>
  );
};

export default App;
