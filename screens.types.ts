import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppStackParamsList = {
  Login: undefined;
  Signup: undefined;
  Home: BottomTabScreenProps<HomeTabParamsList>;
  CourseCart: undefined;
};

export type HomeTabParamsList = {
  ScheduleScreen: NativeStackScreenProps<ScheduleScreenParamsList>;
  ScheduleList: undefined;
  Account: undefined;
};

export type ScheduleScreenParamsList = {
  ScheduleCalendar: undefined;
  CourseCart: undefined;
  CourseSearch: undefined;
};
