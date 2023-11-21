import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CourseSearchScreenParamsList} from '../../../../screens.types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import CourseSearchResultCardComponent from './CourseSearchResultCardComponent';
import FlatListItemSeparator from '../../../UI/FlatListItemSeparator';
import {CourseSearchResult} from '../../../../store/types';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';

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
  const insets = useSafeAreaInsets();

  const classStatisticsRef = useRef<BottomSheetModal>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    classStatisticsRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    classStatisticsRef.current?.close();
  }, []);
  const handleExpandPress = useCallback(() => {
    classStatisticsRef.current?.present();
  }, []);
  return (
    <View style={{paddingTop: insets.top}} className="flex-1 bg-white pt-2">
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
          <CourseSearchResultCardComponent
            showStatistics={(name: string) => {
              setSelectedClass(name);
              handleExpandPress();
            }}
            key={index}
            item={item}
          />
        )}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
      />
      <BottomSheetModal
        ref={classStatisticsRef}
        onChange={handleSheetChange}
        enablePanDownToClose
        enableDynamicSizing
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.44,
          shadowRadius: 10.32,

          elevation: 16,
        }}>
        <BottomSheetScrollView>
          <View>
            <Text>{selectedClass}</Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};

export default CourseSearchResultComponent;
