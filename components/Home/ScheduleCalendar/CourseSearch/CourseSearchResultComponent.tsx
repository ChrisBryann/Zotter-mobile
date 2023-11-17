import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CourseSearchScreenParamsList} from '../../../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import CourseSearchResultCardComponent from './CourseSearchResultCardComponent';
import FlatListItemSeparator from '../../../UI/FlatListItemSeparator';
import {CourseSearchResult} from '../../../../store/types';

const CourseSearchResultComponent = ({
  route,
  navigation,
}: NativeStackScreenProps<
  CourseSearchScreenParamsList,
  'CourseSearchResult'
>) => {
  const coursesData: CourseSearchResult[] = route.params.coursesData;
  const [courses, setCourses] = useState<CourseSearchResult[]>(coursesData);
  const [searchCourse, setSearchCourse] = useState<string>('');
  return (
    <SafeAreaView className="flex-1 bg-white pt-2">
      <View className="flex flex-row items-center justify-evenly my-2 px-2 w-screen top-0">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon />
        </TouchableOpacity>

        <TextInput
          placeholder="Search"
          value={searchCourse}
          onChangeText={(text: string) => {
            setSearchCourse(text);
            text = text.toLowerCase();
            setCourses(
              coursesData.filter(
                course =>
                  `${course.deptCode.toLowerCase()} ${course.courseNumber.toLowerCase()} - ${course.courseTitle.toLowerCase()}`.indexOf(
                    text,
                  ) > -1,
              ),
            );
          }}
          className="border border-gray-400 rounded-lg p-2 w-10/12"
          clearButtonMode="always"
        />
      </View>
      <FlatList
        data={courses}
        className="w-screen"
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <CourseSearchResultCardComponent key={index} item={item} />
        )}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default CourseSearchResultComponent;
