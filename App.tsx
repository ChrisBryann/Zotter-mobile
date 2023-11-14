import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamsList} from './screens.types';
import LoginComponent from './components/Auth/LoginComponent';
import SignupComponent from './components/Auth/SignupComponent';
import HomeComponent from './components/Home/HomeComponent';
import CourseCartComponent from './components/Home/ScheduleCalendar/CourseCart/CourseCartComponent';

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
        <AppStack.Screen name="CourseCart" component={CourseCartComponent} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
