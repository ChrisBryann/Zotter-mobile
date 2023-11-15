import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  HomeTabParamsList,
  ScheduleScreenParamsList,
} from '../../../screens.types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScheduleCalendarComponent from './ScheduleCalendarComponent';
import CourseCartComponent from './CourseCart/CourseCartComponent';
import CourseSearchScreenComponent from './CourseSearch/CourseSearchScreenComponent';

const ScheduleScreen = createNativeStackNavigator<ScheduleScreenParamsList>();

const ScheduleScreenComponent = ({
  navigation,
}: BottomTabScreenProps<HomeTabParamsList, 'ScheduleScreen'>) => {
  return (
    <ScheduleScreen.Navigator initialRouteName="ScheduleCalendar">
      <ScheduleScreen.Screen
        name="ScheduleCalendar"
        component={ScheduleCalendarComponent}
        options={{headerShown: false}}
      />
      <ScheduleScreen.Screen
        name="CourseCart"
        component={CourseCartComponent}
        options={{headerBackTitle: 'Back', headerTitle: 'My Classes'}}
      />
      <ScheduleScreen.Screen
        name="CourseSearch"
        component={CourseSearchScreenComponent}
        options={{presentation: 'modal', headerShown: false}}
      />
    </ScheduleScreen.Navigator>
  );
};
export default ScheduleScreenComponent;
