import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CourseSearchScreenParamsList} from '../../../../screens.types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import CourseSearchResultCardComponent from './CourseSearchResultCardComponent';
import FlatListItemSeparator from '../../../UI/FlatListItemSeparator';
import {CourseSearchResult} from '../../../../store/types';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

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
  // const handleSnapPress = useCallback((index: number) => {
  //   classStatisticsRef.current?.snapToIndex(index);
  // }, []);
  // const handleClosePress = useCallback(() => {
  //   classStatisticsRef.current?.close();
  // }, []);
  const handleExpandPress = useCallback(() => {
    classStatisticsRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  const renderItems = useCallback(
    ({item, index}: {item: CourseSearchResult; index: number}) => (
      <CourseSearchResultCardComponent
        showStatistics={(name: string) => {
          setSelectedClass(name);
          handleExpandPress();
        }}
        key={index}
        item={item}
      />
    ),
    [handleExpandPress],
  );
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
        renderItem={renderItems}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={3}
      />
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={classStatisticsRef}
          onChange={handleSheetChange}
          backdropComponent={renderBackdrop}
          enablePanDownToClose
          enableDynamicSizing
          enableDismissOnClose>
          <BottomSheetView>
            <Text>{selectedClass} nice</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default CourseSearchResultComponent;
