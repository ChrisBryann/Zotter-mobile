import React, {useCallback, useMemo} from 'react';
import {FlatList, Text, View} from 'react-native';
import {HomeTabParamsList} from '../../../screens.types';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import ScheduleListCardComponent from './ScheduleListCardComponent';
import FlatListItemSeparator from '../../UI/FlatListItemSeparator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from '../../../store/hooks';
import {selectAdded} from '../../../store/Schedule/ScheduleSlice';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import MasonryList from '@react-native-seoul/masonry-list';
import {CourseSchedule} from '../../../store/types';
import {
  AcademicCapIcon,
  BeakerIcon,
  LanguageIcon,
  MusicalNoteIcon,
  RocketLaunchIcon,
  ScaleIcon,
  VariableIcon,
} from 'react-native-heroicons/solid';

const ScheduleListComponent = ({
  navigation,
}: BottomTabScreenProps<HomeTabParamsList, 'ScheduleList'>) => {
  const insets = useSafeAreaInsets();
  const addedSchedules = useAppSelector(selectAdded);

  const randomIcons = useMemo(
    () => [
      AcademicCapIcon,
      BeakerIcon,
      LanguageIcon,
      MusicalNoteIcon,
      RocketLaunchIcon,
      ScaleIcon,
      VariableIcon,
    ],
    [],
  );

  const renderItems = useCallback(
    ({item, i: index}: {item: unknown; i: number}) => (
      <ScheduleListCardComponent
        key={index}
        item={item as CourseSchedule}
        Icon={randomIcons[Math.floor(Math.random() * randomIcons.length)]}
        hasLeftMargin={index % 2 === 0 ? false : true}
      />
    ),
    [randomIcons],
  );
  return (
    <View className="flex-1 bg-white">
      <View
        style={{paddingTop: insets.top}}
        className="flex flex-row justify-between items-center">
        <Text className="text-3xl font-bold p-2">Schedules</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ScheduleScreen');
          }}
          className="p-2">
          <Text className="underline font-bold">Create</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 items-center px-2">
        <MasonryList
          className="w-screen"
          data={addedSchedules}
          renderItem={renderItems}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
      {/* <BottomSheetModal
        ref={courseSheetRef}
        index={0}
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        enableDynamicSizing
        enableDismissOnClose>
        <BottomSheetScrollView>
          <View className="flex m-2">
            <Text className="text-2xl font-bold px-3">
              {selectedCourse.title} {selectedCourse.description}
            </Text>
            <View className="flex flex-row items-start justify-between p-3">
              <View className="w-1/3">
                <TouchableOpacity className="bg-blue-600 p-2 rounded-full mr-auto">
                  <Text className="text-white font-semibold">
                    {selectedCourse.code}
                  </Text>
                </TouchableOpacity>
                <View className="mt-0.5">
                  <Text className="text-gray-700 font-semibold">
                    Location:{' '}
                    <Text className="text-blue-600">
                      {selectedCourse.location}
                    </Text>
                  </Text>
                  <Text className="text-gray-700 font-semibold">
                    Time: {selectedCourse.time}
                  </Text>
                  <Text className="text-gray-700 font-semibold">
                    Day(s): {selectedCourse.days}
                  </Text>
                  <Text className="text-gray-700 font-semibold">
                    Section: {selectedCourse.section}
                  </Text>
                </View>
              </View>
              <View className="h-[150px] justify-between">
                <View className="flex items-end">
                  <View className="flex flex-row items-center gap-x-2">
                    <View
                      className={`${
                        selectedCourse.type === 'Lec'
                          ? 'bg-gray-300'
                          : selectedCourse.type === 'Dis'
                          ? 'bg-violet-300'
                          : 'bg-orange-300'
                      } p-2 rounded-full`}>
                      <Text
                        className={`${
                          selectedCourse.type === 'Lec'
                            ? 'text-black'
                            : selectedCourse.type === 'Dis'
                            ? 'text-violet-600'
                            : 'text-orange-600'
                        } font-semibold`}>
                        {selectedCourse.type}
                      </Text>
                    </View>
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
                <CourseSearchResultCardActionButton
                  id={selectedCourse.id}
                  onAddCourse={() =>
                    dispatch(addCurrentCourseAppointment(selectedCourse))
                  }
                  onRemoveCourse={() =>
                    dispatch(deleteCurrentCourseAppointment(selectedCourse.id))
                  }
                />
              </View>
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal> */}
    </View>
  );
};

export default ScheduleListComponent;
