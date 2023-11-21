import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ScheduleScreenParamsList} from '../../../screens.types';

import {NoSymbolIcon} from 'react-native-heroicons/outline';
import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineList,
  TimelineListProps,
  TimelineProps,
} from 'react-native-calendars';
import moment from 'moment';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AcademicCapIcon,
  BookmarkSquareIcon,
  ChartBarIcon,
  MapIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/solid';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TIME_FORMAT} from '../../../utils/utils';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
  addCurrentCourseAppointment,
  deleteCurrentCourseAppointment,
  selectCurrent,
  updateCurrentSchedule,
} from '../../../store/Schedule/ScheduleSlice';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {CourseItem} from '../../../store/types';
import CourseSearchResultCardActionButton from '../../UI/CourseSearchResultCardActionButton';
/*export interface Event {
    id?: string;
    start: string;
    end: string;
    title: string;
    summary?: string;
    color?: string;
} */

// in this page, show two optiosn: create new, or load
const ScheduleCalendarComponent = ({
  navigation,
}: NativeStackScreenProps<ScheduleScreenParamsList, 'ScheduleCalendar'>) => {
  const dispatch = useAppDispatch();

  const courseSchedule = useAppSelector(selectCurrent);
  const [eventsByDate, setEventsByDate] = useState<TimelineListProps['events']>(
    {},
  );
  const courseSheetRef = useRef<BottomSheetModal>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem>({});

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);
  // const handleSnapPress = useCallback((index: number) => {
  //   courseSheetRef.current?.snapToIndex(index);
  // }, []);
  // const handleClosePress = useCallback(() => {
  //   courseSheetRef.current?.close();
  // }, []);
  const handleExpandPress = useCallback(() => {
    courseSheetRef.current?.present();
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

  const [scheduleName, setScheduleName] = useState<string>('');

  const [currentDate, setCurrentDate] = useState<string>(
    moment().startOf('week').add(1, 'days').format(TIME_FORMAT),
  );

  const onDateChanged = (date: string, source: string) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    setCurrentDate(date);
  };

  const onMonthChange = (month: any, updateSource: any) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    onEventPress: event => {
      const currentCourse = courseSchedule.courses.find(
        course => course.id === event.id?.split('@')[0],
      )!; //id is always set, so don't worry
      console.log(currentCourse);

      setSelectedCourse(currentCourse);
      handleExpandPress();
      console.log(event);
    },
    // onBackgroundLongPress: this.createNewEvent,
    // onBackgroundLongPressOut: this.approveNewEvent,
    // scrollToFirst: true,
    start: 7,
    end: 22,
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };
  const INITIAL_TIME = {hour: 7, minutes: 0};
  const insets = useSafeAreaInsets();

  useEffect(() => {
    console.log(courseSchedule);
    // fix dates of appointments if we're in a different week --> infinite loop
    setEventsByDate(
      courseSchedule.appointments.reduce(
        (obj: any, item) => ({
          ...obj,
          [moment(item.start).format('YYYY-MM-DD')]: obj[
            moment(item.start).format('YYYY-MM-DD')
          ]
            ? [...obj[moment(item.start).format('YYYY-MM-DD')], item]
            : [item],
        }),
        {},
      ),
    );
  }, [courseSchedule]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focused!');

      dispatch(updateCurrentSchedule());
    });

    return unsubscribe;
  });

  return (
    <View
      style={{
        paddingTop: insets.top,
      }}
      className="flex-1 bg-white">
      <CalendarProvider
        date={currentDate} // set this to current week's Monday
        onDateChanged={onDateChanged}
        onMonthChange={onMonthChange}
        disabledOpacity={0.6}>
        <ExpandableCalendar
          firstDay={1}
          disableWeekScroll={true}
          style={{
            shadowRadius: 0,
          }}
          theme={{
            selectedDayBackgroundColor: '#1D4ED8',
            todayTextColor: 'black',
            textSectionTitleColor: 'black',
            dayTextColor: 'black',
          }}
          renderHeader={_ => {
            return (
              <TouchableOpacity>
                <TextInput
                  className="text-lg font-semibold py-2 text-center"
                  onChangeText={setScheduleName}
                  value={scheduleName}
                  placeholder="Schedule Title"
                />
              </TouchableOpacity>
            );
          }}
          hideKnob
          renderArrow={direction => {
            return (
              <TouchableOpacity
                onPress={
                  direction === 'right' &&
                  (() => {
                    navigation.navigate('CourseCart');
                  })
                }>
                {direction === 'right' && <ShoppingBagIcon color={'#1D4ED8'} />}
              </TouchableOpacity>
            );
          }}
          disableArrowLeft
          disableArrowRight
          disablePan={true}
          showsHorizontalScrollIndicator={false}
        />
        <TimelineList
          events={eventsByDate}
          timelineProps={timelineProps}
          // scrollToNow
          scrollToFirst
          initialTime={INITIAL_TIME} // initial time must always be on the Monday for this to work
        />
      </CalendarProvider>
      <View className="flex flex-row items-center justify-around p-2 rounded-t-2xl bg-blue-900">
        <TouchableOpacity className="bg-gray-500 p-2 rounded-lg flex flex-row items-center gap-x-2 shadow-md">
          <Text className="text-white text-lg font-semibold">Clear</Text>
          <NoSymbolIcon color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CourseSearch')}
          className="bg-yellow-600 p-2 rounded-lg flex flex-row items-center gap-x-2 shadow-md">
          <Text className="text-white text-lg font-semibold">Find Class</Text>
          <AcademicCapIcon color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-600 p-2 rounded-lg flex flex-row items-center gap-x-2 shadow-md">
          <Text className="text-white text-lg font-semibold">Save</Text>
          <BookmarkSquareIcon color={'white'} />
        </TouchableOpacity>
      </View>
      <BottomSheetModal
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
                {/* <Text className="text-lg font-bold">
                {item.deptCode} {item.courseNumber}
              </Text> */}
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
      </BottomSheetModal>
    </View>
  );
};

export default ScheduleCalendarComponent;
