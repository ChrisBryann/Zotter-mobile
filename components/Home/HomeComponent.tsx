import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamsList, HomeTabParamsList} from '../../screens.types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountComponent from './AccountComponent';
import {RouteProp} from '@react-navigation/native';
import {
  CalendarDaysIcon,
  BookmarkIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import ScheduleListComponent from './ScheduleListComponent';
import ScheduleScreenComponent from './ScheduleCalendar/ScheduleScreenComponent';

const HomeTab = createBottomTabNavigator<HomeTabParamsList>();

const HomeComponent = ({
  navigation,
}: NativeStackScreenProps<AppStackParamsList, 'Home'>) => {
  return (
    <HomeTab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<HomeTabParamsList, keyof HomeTabParamsList>;
      }) => ({
        tabBarIcon: () => {
          return route.name === 'ScheduleScreen' ? (
            <CalendarDaysIcon color={'#1D4ED8'} />
          ) : route.name === 'ScheduleList' ? (
            <BookmarkIcon color={'#1D4ED8'} />
          ) : (
            <UserIcon color={'#1D4ED8'} />
          );
        },
        tabBarShowLabel: false,
        // tabBarStyle: {
        //   borderTopWidth: 0,
        //   borderTopLeftRadius: 15,
        //   borderTopRightRadius: 15,
        //   position: 'absolute',
        // },
        tabBarActiveBackgroundColor: '#E2E8F0',
        tabBarItemStyle: {
          borderRadius: 15,
          margin: 5,
          marginHorizontal: 10,
        },
      })}>
      <HomeTab.Screen
        name="ScheduleScreen"
        component={ScheduleScreenComponent}
        options={{headerShown: false}}
      />
      <HomeTab.Screen
        name="ScheduleList"
        component={ScheduleListComponent}
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
