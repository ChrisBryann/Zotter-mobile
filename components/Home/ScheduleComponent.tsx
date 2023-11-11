import React from 'react';
import {Text} from 'react-native';
import {HomeTabParamsList} from '../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

const ScheduleComponent = ({
  navigation,
}: BottomTabScreenProps<HomeTabParamsList, 'Schedule'>) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-start pt-6 gap-4">
      <Text>Hello Schedule</Text>
    </SafeAreaView>
  );
};

export default ScheduleComponent;
