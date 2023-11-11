import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamsList, HomeTabParamsList} from '../../screens.types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScheduleComponent from './ScheduleComponent';
import CourseCartComponent from './CourseCartComponent';
import AccountComponent from './AccountComponent';

const HomeTab = createBottomTabNavigator<HomeTabParamsList>();

const HomeComponent = ({
  navigation,
}: NativeStackScreenProps<AppStackParamsList, 'Home'>) => {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen
        name="Schedule"
        component={ScheduleComponent}
        options={{headerShown: false}}
      />
      <HomeTab.Screen
        name="CourseCart"
        component={CourseCartComponent}
        options={{headerShown: false}}
      />
      <HomeTab.Screen
        name="Account"
        component={AccountComponent}
        options={{headerShown: false}}
      />
    </HomeTab.Navigator>
  );
};

export default HomeComponent;
