import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  CourseSearchScreenParamsList,
  ScheduleScreenParamsList,
} from '../../../../screens.types';
import CourseSearchFormComponent from './CourseSearchFormComponent';
import CourseSearchResultComponent from './CourseSearchResultComponent';

const CourseSearchScreen =
  createNativeStackNavigator<CourseSearchScreenParamsList>();

const CourseSearchScreenComponent = ({}: NativeStackScreenProps<
  ScheduleScreenParamsList,
  'CourseSearch'
>) => {
  return (
    <CourseSearchScreen.Navigator initialRouteName="CourseSearchForm">
      <CourseSearchScreen.Screen
        name="CourseSearchForm"
        component={CourseSearchFormComponent}
        options={{headerShown: false}}
      />
      <CourseSearchScreen.Screen
        name="CourseSearchResult"
        component={CourseSearchResultComponent}
        options={{headerShown: false, presentation: 'fullScreenModal'}}
      />
    </CourseSearchScreen.Navigator>
  );
};

export default CourseSearchScreenComponent;
