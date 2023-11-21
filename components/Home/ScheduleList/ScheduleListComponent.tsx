import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {HomeTabParamsList} from '../../../screens.types';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import ScheduleListCardComponent from './ScheduleListCardComponent';
import FlatListItemSeparator from '../../UI/FlatListItemSeparator';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ScheduleListComponent = ({
  navigation,
}: BottomTabScreenProps<HomeTabParamsList, 'ScheduleList'>) => {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white">
      <View
        style={{paddingTop: insets.top}}
        className="flex flex-row justify-between items-center">
        <Text className="text-3xl font-bold p-2">Schedules</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ScheduleScreen');
          }}
          className="p-2">
          <Text className="underline font-bold">Create</Text>
        </TouchableOpacity>
      </View>
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
    </View>
  );
};

export default ScheduleListComponent;
