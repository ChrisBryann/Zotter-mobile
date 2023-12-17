import React, {useCallback, useMemo, useRef, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {HomeTabParamsList} from '../../../screens.types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import ScheduleListCardComponent from './ScheduleListCardComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppSelector} from '../../../store/hooks';
import {
  deleteCourseSchedule,
  selectAdded,
  setCurrentSchedule,
} from '../../../store/Schedule/ScheduleSlice';
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
import {useDispatch} from 'react-redux';
import {toast} from '@baronha/ting';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

const ScheduleListComponent = ({
  navigation,
}: BottomTabScreenProps<HomeTabParamsList, 'ScheduleList'>) => {
  const insets = useSafeAreaInsets();
  const addedSchedules = useAppSelector(selectAdded);
  const dispatch = useDispatch();

  // const randomIcons = useMemo(
  //   () => [
  //     AcademicCapIcon,
  //     BeakerIcon,
  //     LanguageIcon,
  //     MusicalNoteIcon,
  //     RocketLaunchIcon,
  //     ScaleIcon,
  //     VariableIcon,
  //   ],
  //   [],
  // );

  // bottom sheet modal
  const scheduleRef = useRef<BottomSheetModal>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<CourseSchedule>({});

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);
  const handleExpandPress = useCallback(() => {
    scheduleRef.current?.present();
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

  const showSchedule = (id: string) => {
    // set the current schedule displayed with the wanted schedule, toast success message and redirect to schedule screen
    dispatch(setCurrentSchedule(id));
    scheduleRef.current?.dismiss();
    toast({
      title: 'Schedule loaded!',
      backgroundColor: '#f3f4f6',
      titleColor: '#22C55E',
    });
    navigation.navigate('ScheduleScreen');
  };

  const deleteSchedule = () => {
    dispatch(deleteCourseSchedule(selectedSchedule.id));
    scheduleRef.current?.dismiss();
    toast({
      title: 'Schedule deleted!',
      backgroundColor: '#f3f4f6',
      titleColor: '#22C55E',
    });
  };

  const renderItems = useCallback(
    ({item, i: index}: {item: unknown; i: number}) => (
      <ScheduleListCardComponent
        key={index}
        item={item as CourseSchedule}
        // Icon={randomIcons[Math.floor(Math.random() * randomIcons.length)]}
        hasLeftMargin={index % 2 === 0 ? false : true}
        onDisplay={handleExpandPress}
        onSetSchedule={(schedule: CourseSchedule) => {
          setSelectedSchedule(schedule);
        }}
      />
    ),
    [handleExpandPress],
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
      {!addedSchedules.length ? (
        <View className="flex items-center justify-start my-auto">
          <Image
            source={require('../../../assets/images/empty_schedule.png')}
            className="w-full h-4/5"
            resizeMode="contain"
          />
          <Text className="font-semibold text-lg">No schedule found!</Text>
        </View>
      ) : (
        <>
          <View className="flex-1 items-center px-2">
            <MasonryList
              className="w-screen"
              data={addedSchedules}
              renderItem={renderItems}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
          <BottomSheetModal
            ref={scheduleRef}
            index={0}
            onChange={handleSheetChange}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            enableDynamicSizing
            enableDismissOnClose>
            <BottomSheetScrollView>
              <View className="flex m-2 py-2">
                <Text className="text-2xl font-bold px-3">
                  {selectedSchedule.title}
                </Text>
                <View className="flex gap-y-2 p-3">
                  <View className="flex flex-row">
                    <Text className="font-semibold text-center">
                      Total Courses:{' '}
                    </Text>
                    <Text className="text-blue-600 font-semibold">
                      {selectedSchedule.courses?.length || 0}
                    </Text>
                  </View>
                  <View className="flex flex-row">
                    <Text className="font-semibold">Last modified on: </Text>
                    <Text className="text-blue-600 font-semibold">
                      {selectedSchedule.modified}
                    </Text>
                  </View>

                  <View className="flex flex-row justify-around py-2">
                    <TouchableOpacity
                      onPress={deleteSchedule}
                      className="p-2 rounded-lg">
                      <Text className="text-red-600 underline font-semibold">
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        showSchedule(selectedSchedule.id);
                      }}
                      className="p-2 rounded-lg">
                      <Text className="text-blue-600 underline font-semibold">
                        Load
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </>
      )}
    </View>
  );
};

export default ScheduleListComponent;
