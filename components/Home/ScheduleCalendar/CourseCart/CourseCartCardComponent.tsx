import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {TrashIcon} from 'react-native-heroicons/outline';

type CourseCartCardProps = {
  item: string;
};

const CourseCartCardComponent = ({item}: CourseCartCardProps) => {
  return (
    // <View className="bg-blue-100 rounded rounded-md w-screen my-4">
    //   <Text>{item}</Text>
    // </View>

    <View className="flex flex-row items-center justify-between my-6 px-6">
      <View>
        <Text className="text-lg font-bold text-gray-900">
          COMPSCI 116 - Lec A
        </Text>

        <View className="mt-0.5  text-gray-600">
          <Text className="text-gray-700">EH 1200</Text>
          <Text className="text-gray-700">TuTh 2:00- 3:20p</Text>
        </View>
      </View>
      <View className="flex items-center gap-3">
        <TouchableOpacity>
          <Text className="text-blue-600 font-semibold">34010</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <TrashIcon color={'red'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseCartCardComponent;
