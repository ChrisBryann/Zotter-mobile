import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {HomeTabParamsList} from '../../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import ScheduleListCardComponent from './ScheduleListCardComponent';
import FlatListItemSeparator from '../../UI/FlatListItemSeparator';

const ScheduleListComponent = ({
  navigation,
}: BottomTabScreenProps<HomeTabParamsList, 'ScheduleList'>) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-center text-4xl font-semibold py-2 px-2">
        Schedules
      </Text>
      <View className="border-b border-gray-200" />
      <View className="flex-1 items-center">
        <FlatList
          className="w-screen"
          data={['1', '2', '3', '4', '5', '6']}
          renderItem={({item, index}) => (
            <ScheduleListCardComponent key={index} item={item} />
          )}
          keyExtractor={item => item}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScheduleListComponent;
