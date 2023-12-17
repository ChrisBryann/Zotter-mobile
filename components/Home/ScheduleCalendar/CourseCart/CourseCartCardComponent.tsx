import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TrashIcon} from 'react-native-heroicons/outline';
import {CourseItem} from '../../../../store/types';
import Clipboard from '@react-native-clipboard/clipboard';
import {toast} from '@baronha/ting';

type CourseCartCardProps = {
  item: CourseItem;
  onRemove: () => void;
};

const CourseCartCardComponent = ({item, onRemove}: CourseCartCardProps) => {
  return (
    // <View className="bg-blue-100 rounded rounded-md w-screen my-4">
    //   <Text>{item}</Text>
    // </View>

    <View className="flex flex-row items-center justify-between my-2  p-3">
      <View>
        <Text className="text-lg font-bold text-gray-900">
          {item.title} - {item.type}
        </Text>

        <View className="mt-0.5  text-gray-600">
          <Text className="text-gray-700">{item.location}</Text>
          <Text className="text-gray-700">
            {item.days} {item.time}
          </Text>
        </View>
      </View>
      <View className="flex items-center gap-3">
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(item.code);
            toast({
              title: 'Code Copied!',
              backgroundColor: '#f3f4f6',
              titleColor: '#1D4ED8',
            });
          }}>
          <Text className="text-blue-600 font-semibold">{item.code}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemove}>
          <TrashIcon color={'red'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseCartCardComponent;
