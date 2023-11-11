import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';
import {AppStackParamsList} from './screens.types';
import LoginComponent from './components/Auth/LoginComponent';
import SignupComponent from './components/Auth/SignupComponent';
import HomeComponent from './components/Home/HomeComponent';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const App = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen
          name="Login"
          component={LoginComponent}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name="Signup"
          component={SignupComponent}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name="Home"
          component={HomeComponent}
          options={{headerShown: false}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
