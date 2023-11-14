import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {ScheduleScreenParamsList} from '../../../../screens.types';
import CourseCartCardComponent from './CourseCartCardComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const CourseCartComponent = ({
  navigation,
}: NativeStackScreenProps<ScheduleScreenParamsList, 'CourseCart'>) => {
  return (
    <View className="flex-1 bg-white">
      {/* <Text className="text-left text-4xl font-semibold py-2">My Classes</Text> */}
      <View className="flex h-full items-center justify-between">
        <FlatList
          className="w-screen"
          showsVerticalScrollIndicator={false}
          data={['1', '2', '3', '4', '5', '6']}
          renderItem={({item, index}) => (
            <CourseCartCardComponent key={index} item={item} />
          )}
          keyExtractor={item => item}
        />
        <View className="bottom-0 border-t border-gray-100">
          <View className="w-screen flex flex-row justify-between items-center p-4">
            <View className="space-y-0.5 text-sm text-gray-700">
              <Text className="text-xl font-semibold">Total: 12</Text>
            </View>

            <View className="flex flex-row justify-end gap-2 bottom-0">
              {/* <TouchableOpacity className="rounded-lg bg-blue-600 px-5 py-3">
              <Text className="text-sm text-white text-center font-semibold">
                Add to WebReg
              </Text>
            </TouchableOpacity> */}
              <TouchableOpacity className="rounded-lg bg-blue-600 px-5 py-3">
                <Text className="text-sm text-white text-center font-semibold">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CourseCartComponent;
