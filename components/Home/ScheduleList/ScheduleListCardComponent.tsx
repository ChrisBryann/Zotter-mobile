import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

type ScheduleListCardProps = {
  item: string;
};

const ScheduleListCardComponent = ({item}: ScheduleListCardProps) => {
  return (
    <View className="flex flex-row justify-between my-2 px-6 py-2 rounded-md mx-2">
      <View>
        <Text className="text-xl font-bold text-gray-900">Winter 2023</Text>
        <View className="mt-4">
          <Text className="text-md text-blue-600">Created on: 11/10/2023</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Text className="mt-1 text-md font-medium text-blue-600">Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleListCardComponent;
