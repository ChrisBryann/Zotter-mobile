import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TrashIcon} from 'react-native-heroicons/outline';
import {
  ChartBarIcon,
  MapIcon,
  PlusCircleIcon,
} from 'react-native-heroicons/solid';

type CourseSearchResultCardProps = {
  item: string;
};

const CourseSearchResultCardComponent = ({
  item,
}: CourseSearchResultCardProps) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  return (
    <View className="flex flex-row items-start justify-between m-2 p-3 bg-blue-100 rounded-lg shadow-md">
      <View className="w-1/2">
        <Text className="text-lg font-bold">COMPSCI 116</Text>

        <View className="mt-0.5">
          <Text className="text-gray-700 font-semibold">
            Instructor(s): <Text className="text-blue-600">WONG MA, J.</Text>
          </Text>
          <Text className="text-gray-700 font-semibold">
            Location: <Text className="text-blue-600">EH 1200</Text>
          </Text>
          <Text className="text-gray-700 font-semibold">Time: 2:00-3:20pm</Text>
          <Text className="text-gray-700 font-semibold">Day(s): TuTh</Text>
          <Text className="text-gray-700 font-semibold">Section: A</Text>
          <Text className="text-gray-700 font-semibold">Restrictions: A</Text>
          <Text className="text-gray-700 font-semibold">
            Status: <Text className="text-green-500">OPEN</Text>
          </Text>
        </View>
      </View>
      <View className="h-[150px] justify-between">
        <View className="flex items-end">
          <View className="flex flex-row items-center gap-x-2">
            <View className="bg-gray-300 p-2 rounded-full">
              <Text className="font-semibold">Lec</Text>
            </View>
            <View className="bg-green-200 p-2 rounded-full">
              <Text className="text-green-800 font-semibold">11/20</Text>
            </View>
            <TouchableOpacity className="bg-blue-300 p-2 rounded-full">
              <Text className="text-blue-700 font-semibold">34010</Text>
            </TouchableOpacity>
          </View>
          <View className="pt-2 pr-2 flex flex-row items-center gap-x-2">
            <TouchableOpacity>
              <MapIcon color={'#1D4ED8'} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ChartBarIcon color={'#1D4ED8'} />
            </TouchableOpacity>
          </View>
        </View>
        {!isAdded ? (
          <TouchableOpacity
            onPress={() => {
              setIsAdded(true);
            }}
            className="self-end mr-2 p-2 rounded-full bg-blue-600">
            <Text className="text-yellow-400 font-bold">Add</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsAdded(false);
            }}
            className="self-end mr-2 p-2 rounded-full bg-red-600">
            <Text className="text-white font-bold">Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CourseSearchResultCardComponent;
