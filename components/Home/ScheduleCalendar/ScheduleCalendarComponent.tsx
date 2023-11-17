import React, {useState} from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {ScheduleScreenParamsList} from '../../../screens.types';

import {NoSymbolIcon} from 'react-native-heroicons/outline';
import {
  CalendarProvider,
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  TimelineListProps,
  TimelineProps,
} from 'react-native-calendars';
import moment from 'moment';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AcademicCapIcon,
  BookmarkSquareIcon,
  MagnifyingGlassPlusIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
} from 'react-native-heroicons/solid';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TIME_FORMAT} from '../../../utils/utils';
/*export interface Event {
    id?: string;
    start: string;
    end: string;
    title: string;
    summary?: string;
    color?: string;
} */

export const timelineEvents: TimelineEventProps[] = [
  {
    start: `${moment().startOf('week').format(TIME_FORMAT)} 09:20:00`,
    end: `${moment().subtract(1, 'days').format(TIME_FORMAT)} 12:00:00`,
    title: 'Merge Request to React Native Calendars',
    summary: 'Merge Timeline Calendar to React Native Calendars',
  },
  {
    start: `${moment().startOf('week').format(TIME_FORMAT)} 01:15:00`,
    end: `${moment().startOf('week').format(TIME_FORMAT)} 02:30:00`,
    title: 'Meeting A',
    summary: 'Summary for meeting A',
  },
  {
    start: `${moment().startOf('week').format(TIME_FORMAT)} 01:30:00`,
    end: `${moment().startOf('week').format(TIME_FORMAT)} 02:30:00`,
    title: 'Meeting B',
    summary: 'Summary for meeting B',
  },
  {
    start: `${moment().startOf('week').format(TIME_FORMAT)} 01:45:00`,
    end: `${moment().startOf('week').format(TIME_FORMAT)} 02:45:00`,
    title: 'Meeting C',
    summary: 'Summary for meeting C',
  },
  {
    start: `${moment().startOf('week').format(TIME_FORMAT)} 02:40:00`,
    end: `${moment().startOf('week').format(TIME_FORMAT)} 03:10:00`,
    title: 'Meeting D',
    summary: 'Summary for meeting D',
  },
  {
    start: `${moment().startOf('week').format(TIME_FORMAT)} 02:50:00`,
    end: `${moment().startOf('week').format(TIME_FORMAT)} 03:20:00`,
    title: 'Meeting E',
    summary: 'Summary for meeting E',
  },
  {
    start: `${moment().startOf('week').format(TIME_FORMAT)} 04:30:00`,
    end: `${moment().startOf('week').format(TIME_FORMAT)} 05:30:00`,
    title: 'Meeting F',
    summary: 'Summary for meeting F',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 00:30:00`,
    end: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 01:30:00`,
    title: 'Visit Grand Mother',
    summary: 'Visit Grand Mother and bring some fruits.',
    color: 'lightblue',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 02:30:00`,
    end: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 03:20:00`,
    title: 'Meeting with Prof. Behjet Zuhaira',
    summary: 'Meeting with Prof. Behjet at 130 in her office.',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 04:10:00`,
    end: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 04:40:00`,
    title: 'Tea Time with Dr. Hasan',
    summary: 'Tea Time with Dr. Hasan, Talk about Project',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 01:05:00`,
    end: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 01:35:00`,
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 14:30:00`,
    end: `${moment()
      .startOf('week')
      .add(1, 'days')
      .format(TIME_FORMAT)} 16:30:00`,
    title: 'Meeting Some Friends in ARMED',
    summary: 'Arsalan, Hasnaat, Talha, Waleed, Bilal',
    color: 'pink',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(2, 'days')
      .format(TIME_FORMAT)} 01:40:00`,
    end: `${moment()
      .startOf('week')
      .add(2, 'days')
      .format(TIME_FORMAT)} 02:25:00`,
    title: 'Meet Sir Khurram Iqbal',
    summary: 'Computer Science Dept. Comsats Islamabad',
    color: 'orange',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(2, 'days')
      .format(TIME_FORMAT)} 04:10:00`,
    end: `${moment()
      .startOf('week')
      .add(2, 'days')
      .format(TIME_FORMAT)} 04:40:00`,
    title: 'Tea Time with Colleagues',
    summary: 'WeRplay',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(2, 'days')
      .format(TIME_FORMAT)} 00:45:00`,
    end: `${moment()
      .startOf('week')
      .add(2, 'days')
      .format(TIME_FORMAT)} 01:45:00`,
    title: 'Lets Play Apex Legends',
    summary: 'with Boys at Work',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(2, 'days')
      .format(TIME_FORMAT)} 11:30:00`,
    end: `${moment()
      .startOf('week')
      .add(2, 'days')
      .format(TIME_FORMAT)} 12:30:00`,
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
  },
  {
    start: `${moment()
      .startOf('week')
      .add(4, 'days')
      .format(TIME_FORMAT)} 12:10:00`,
    end: `${moment()
      .startOf('week')
      .add(4, 'days')
      .format(TIME_FORMAT)} 13:45:00`,
    title: 'Merge Request to React Native Calendars',
    summary: 'Merge Timeline Calendar to React Native Calendars',
  },
];

export const WEEK_VALUES = {
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
  Sun: 0,
};
// in this page, show two optiosn: create new, or load
const ScheduleCalendarComponent = ({
  navigation,
}: NativeStackScreenProps<ScheduleScreenParamsList, 'ScheduleCalendar'>) => {
  const [scheduleName, setScheduleName] = useState<string>('');
  const [isEditingScheduleName, setIsEditingScheduleName] =
    useState<boolean>(false);

  const [currentDate, setCurrentDate] = useState<string>(
    moment().startOf('week').add(1, 'days').format(TIME_FORMAT),
  );

  const [eventsByDate, setEventsByDate] = useState<TimelineListProps['events']>(
    timelineEvents.reduce(
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

  const onDateChanged = (date: string, source: string) => {
    console.log('TimelineCalendarScreen onDateChanged: ', date, source);
    setCurrentDate(date);
  };

  const onMonthChange = (month: any, updateSource: any) => {
    console.log('TimelineCalendarScreen onMonthChange: ', month, updateSource);
  };

  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    // onBackgroundLongPress: this.createNewEvent,
    // onBackgroundLongPressOut: this.approveNewEvent,
    // scrollToFirst: true,
    start: 7,
    end: 22,
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
  };
  const INITIAL_TIME = {hour: 9, minutes: 0};
  const insets = useSafeAreaInsets();
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
      <View className="flex flex-row items-center justify-around p-2 rounded-t-2xl">
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
    </View>
  );
};

export default ScheduleCalendarComponent;
