import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamsList, HomeTabParamsList} from '../../screens.types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountComponent from './AccountComponent';
import {RouteProp} from '@react-navigation/native';
import {
  CalendarDaysIcon as CalendarDaysSolidIcon,
  BookmarkIcon as BookmarkSolidIcon,
  UserIcon as UserSolidIcon,
} from 'react-native-heroicons/solid';
import {
  CalendarDaysIcon,
  BookmarkIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import ScheduleListComponent from './ScheduleList/ScheduleListComponent';
import ScheduleScreenComponent from './ScheduleCalendar/ScheduleScreenComponent';

const HomeTab = createBottomTabNavigator<HomeTabParamsList>();

const HomeComponent = ({}: NativeStackScreenProps<
  AppStackParamsList,
  'Home'
>) => {
  return (
    <HomeTab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<HomeTabParamsList, keyof HomeTabParamsList>;
      }) => ({
        tabBarIcon: ({focused, color, size}) => {
          return route.name === 'ScheduleScreen' ? (
            focused ? (
              <CalendarDaysSolidIcon color={color} />
            ) : (
              <CalendarDaysIcon color={color} />
            )
          ) : route.name === 'ScheduleList' ? (
            focused ? (
              <BookmarkSolidIcon color={color} />
            ) : (
              <BookmarkIcon color={color} />
            )
          ) : focused ? (
            <UserSolidIcon color={color} />
          ) : (
            <UserIcon color={color} />
          );
        },
        // tabBarLabel: ({focused, color, size}) => {
        //   return route.name === 'ScheduleScreen' ? (
        //     <Text className={`text-sm`}>Calendar</Text>
        //   ) : route.name === 'ScheduleList' ? (
        //     <Text>Schedules</Text>
        //   ) : (
        //     <Text>Profile</Text>
        //   );
        // },
        tabBarShowLabel: false,
        // tabBarStyle: {
        //   borderTopWidth: 0,
        //   borderTopLeftRadius: 15,
        //   borderTopRightRadius: 15,
        //   position: 'absolute',
        // },
        tabBarActiveTintColor: '#1D4ED8',
        tabBarInactiveTintColor: '#1D4ED8',
        tabBarItemStyle: {
          borderRadius: 10,
          marginVertical: 5,
          marginHorizontal: 20,
        },
        tabBarActiveBackgroundColor: '#DBEAFE',
      })}
      initialRouteName="ScheduleList">
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
