import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';

type ScheduleListCardProps = {
  item: string;
};

const ScheduleListCardComponent = ({item}: ScheduleListCardProps) => {
  return (
    <View className="flex flex-row justify-between my-2 px-2 py-2 rounded-lg mx-2 bg-blue-100">
      <View>
        <View className="flex-row gap-x-2 items-center">
          <Text className="text-xl font-bold text-gray-900">Winter 2023</Text>
          <TouchableOpacity>
            <InformationCircleIcon />
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <Text className="text-md text-gray-700 font-semibold">
            Last modified on: 11/10/2023
          </Text>
        </View>
      </View>
      <View className="flex-row gap-x-2">
        <TouchableOpacity>
          <PencilIcon />
          {/* on press, load the schedule to the schedule tab screen and then redirect it to the schedule tab once loaded */}
        </TouchableOpacity>
        <TouchableOpacity>
          <TrashIcon color={'red'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleListCardComponent;
