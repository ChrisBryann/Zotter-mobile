import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {ScheduleScreenParamsList} from '../../../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import CourseCartCardComponent from './CourseCartCardComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const CourseCartComponent = ({
  navigation,
}: NativeStackScreenProps<ScheduleScreenParamsList, 'CourseCart'>) => {
  return (
    <SafeAreaView className="flex-1 p-6 gap-4 bg-white">
      <Text className="text-left text-4xl font-semibold py-2">My Classes</Text>
      <View className="flex items-center">
        <FlatList
          data={['1', '2']}
          renderItem={({item, index}) => (
            <CourseCartCardComponent key={index} item={item} />
          )}
          keyExtractor={item => item}
        />
      </View>
    </SafeAreaView>
  );
};

export default CourseCartComponent;
