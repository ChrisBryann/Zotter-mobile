import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CourseSearchScreenParamsList} from '../../../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import CourseSearchResultCardComponent from './CourseSearchResultCardComponent';

const CourseSearchResultComponent = ({
  navigation,
}: NativeStackScreenProps<
  CourseSearchScreenParamsList,
  'CourseSearchResult'
>) => {
  return (
    <SafeAreaView className="flex-1 bg-white pt-2">
      <View className="flex flex-row items-center justify-between px-2 w-screen top-0">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon />
        </TouchableOpacity>

        <TextInput
          placeholder="Search"
          className="border border-gray-400 rounded-lg p-2 w-10/12"
          clearButtonMode="always"
        />
      </View>
      <FlatList
        data={['1', '2', '3', '4', '5', '6']}
        className="w-screen"
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <CourseSearchResultCardComponent key={index} item={item} />
        )}
        keyExtractor={item => item}
      />
    </SafeAreaView>
  );
};

export default CourseSearchResultComponent;
