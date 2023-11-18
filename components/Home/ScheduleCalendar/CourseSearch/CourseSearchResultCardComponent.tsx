import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ChartBarIcon, MapIcon} from 'react-native-heroicons/solid';
import {CourseItem, CourseSearchResult} from '../../../../store/types';
import CourseSearchResultCardActionButton from '../../../UI/CourseSearchResultCardActionButton';
import {useDispatch} from 'react-redux';
import {
  addCurrentCourseAppointment,
  deleteCurrentCourseAppointment,
} from '../../../../store/Schedule/ScheduleSlice';

type CourseSearchResultCardProps = {
  item: CourseSearchResult;
};

const CourseSearchResultCardComponent = ({
  item,
}: CourseSearchResultCardProps) => {
  const dispatch = useDispatch();

  return (
    <View className="flex rounded-lg shadow-md rounded-lg shadow-md m-2">
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
          <View
            key={idx}
            className="flex flex-row items-start justify-between p-3">
            <View className="w-1/3">
              {/* <Text className="text-lg font-bold">
                {item.deptCode} {item.courseNumber}
              </Text> */}
              <TouchableOpacity className="bg-blue-600 p-2 rounded-full mr-auto">
                <Text className="text-white font-semibold">{sectionCode}</Text>
              </TouchableOpacity>
              <View className="mt-0.5">
                <Text className="text-gray-700 font-semibold">
                  Instructor(s):
                  <Text className="text-blue-600">
                    {instructors.join(', ')}
                  </Text>
                </Text>
                <Text className="text-gray-700 font-semibold">
                  Location: <Text className="text-blue-600">{Location}</Text>
                </Text>
                <Text className="text-gray-700 font-semibold">
                  Time: {Time}
                </Text>
                <Text className="text-gray-700 font-semibold">
                  Day(s): {days}
                </Text>
                <Text className="text-gray-700 font-semibold">
                  Section: {sectionNum}
                </Text>
                <Text className="text-gray-700 font-semibold">
                  Restrictions: {restrictions}
                </Text>
                <Text className="text-gray-700 font-semibold">
                  Status:{' '}
                  <Text
                    className={`${
                      status === 'OPEN'
                        ? 'text-green-500'
                        : status === 'FULL'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                    }`}>
                    {status === 'OPEN' || status === 'FULL'
                      ? status
                      : status + ` (${numOnWaitlist} student(s) waitlisted)`}
                  </Text>
                </Text>
              </View>
            </View>
            <View className="h-[150px] justify-between">
              <View className="flex items-end">
                <View className="flex flex-row items-center gap-x-2">
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
