import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {MapIcon, PresentationChartBarIcon} from 'react-native-heroicons/solid';
import {CourseItem, CourseSearchResult} from '../../../../store/types';
import CourseSearchResultCardActionButton from '../../../UI/CourseSearchResultCardActionButton';
import {useDispatch} from 'react-redux';
import {
  addCurrentCourseAppointment,
  deleteCurrentCourseAppointment,
} from '../../../../store/Schedule/ScheduleSlice';

type CourseSearchResultCardProps = {
  item: CourseSearchResult;
  showStatistics: (name: string) => void;
};

const CourseSearchResultCardComponent = ({
  item,
  showStatistics,
}: CourseSearchResultCardProps) => {
  const dispatch = useDispatch();

  return (
    <View className="flex m-2">
      <Text className="text-2xl font-bold px-3">
        {item.deptCode} {item.courseNumber} - {item.courseTitle}
      </Text>
      {item.sections.map((section, idx) => {
        const {
          sectionCode,
          sectionType,
          sectionNum,
          units,
          instructors,
          meetings: [{days, time: Time, bldg: Location}],
          //finalExam,
          maxCapacity,
          numCurrentlyEnrolled: {totalEnrolled},
          numOnWaitlist,
          restrictions,
          status,
        } = section;
        return (
          <View key={idx} className="flex gap-y-2 p-3">
            <View className="flex flex-row justify-between">
              <Text className="font-semibold">Instructor(s):</Text>
              <Text className="text-blue-600 font-semibold">
                {instructors.join(', ')}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-semibold">Location:</Text>
              <Text className="text-blue-600 font-semibold">{Location}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-semibold">Time:</Text>
              <Text className="text-blue-600 font-semibold">{Time}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-semibold">Days:</Text>
              <Text className="text-blue-600 font-semibold">{days}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-semibold">Section:</Text>
              <Text className="text-blue-600 font-semibold">{sectionNum}</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-semibold">Restrictions:</Text>
              <Text className="text-blue-600 font-semibold">
                {restrictions}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-semibold">Status:</Text>
              <Text
                className={`${
                  status === 'OPEN'
                    ? 'text-green-500'
                    : status === 'FULL'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                } font-semibold`}>
                {status === 'OPEN' || status === 'FULL'
                  ? status
                  : status + ` (${numOnWaitlist} student(s) waitlisted)`}
              </Text>
            </View>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-x-2">
                <View
                  className={`${
                    sectionType === 'Lec'
                      ? 'bg-gray-300'
                      : sectionType === 'Dis'
                      ? 'bg-violet-300'
                      : 'bg-orange-300'
                  } p-2 rounded-full`}>
                  <Text
                    className={`${
                      sectionType === 'Lec'
                        ? 'text-black'
                        : sectionType === 'Dis'
                        ? 'text-violet-600'
                        : 'text-orange-600'
                    } font-semibold`}>
                    {sectionType}
                  </Text>
                </View>
                <View
                  className={`${
                    totalEnrolled / maxCapacity === 1
                      ? 'bg-red-300'
                      : totalEnrolled / maxCapacity >= 0.5
                      ? 'bg-yellow-300'
                      : 'bg-green-200'
                  } p-2 rounded-full`}>
                  <Text
                    className={`${
                      totalEnrolled / maxCapacity === 1
                        ? 'text-red-600'
                        : totalEnrolled / maxCapacity >= 0.5
                        ? 'text-yellow-600'
                        : 'text-green-800'
                    } font-semibold`}>{`${totalEnrolled}/${maxCapacity}`}</Text>
                </View>
                <View className="bg-blue-300 p-2 rounded-full">
                  <Text className="text-blue-700 font-semibold">
                    Unit(s): {units}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row gap-x-2">
                <TouchableOpacity>
                  <MapIcon color={'#1D4ED8'} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    showStatistics(`${item.deptCode} ${item.courseNumber}`);
                  }}>
                  <PresentationChartBarIcon color={'#1D4ED8'} />
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex flex-row justify-between">
              <TouchableOpacity className="bg-blue-600 p-2 rounded-full">
                <Text className="text-white font-semibold">{sectionCode}</Text>
              </TouchableOpacity>
              <CourseSearchResultCardActionButton
                id={`${item.deptCode} ${item.courseNumber}-${sectionNum}`}
                onAddCourse={() =>
                  dispatch(
                    addCurrentCourseAppointment({
                      id: `${item.deptCode} ${item.courseNumber}-${sectionNum}`,
                      days,
                      time: Time,
                      location: Location,
                      title: `${item.deptCode} ${item.courseNumber}`,
                      description: item.courseTitle,
                      type: sectionType,
                      section: sectionNum,
                      code: sectionCode,
                    } as CourseItem),
                  )
                }
                onRemoveCourse={() =>
                  dispatch(
                    deleteCurrentCourseAppointment(
                      `${item.deptCode} ${item.courseNumber}-${sectionNum}`,
                    ),
                  )
                }
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CourseSearchResultCardComponent;
