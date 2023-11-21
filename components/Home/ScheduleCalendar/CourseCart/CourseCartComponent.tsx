import React, {useCallback} from 'react';
import {FlatList, Text, View} from 'react-native';
import {ScheduleScreenParamsList} from '../../../../screens.types';
import CourseCartCardComponent from './CourseCartCardComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CourseItem} from '../../../../store/types';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {
  deleteCurrentCourseAppointment,
  selectCurrent,
} from '../../../../store/Schedule/ScheduleSlice';

const CourseCartComponent = ({
  navigation,
}: NativeStackScreenProps<ScheduleScreenParamsList, 'CourseCart'>) => {
  const currentSchedule = useAppSelector(selectCurrent);
  const dispatch = useAppDispatch();

  const renderItems = useCallback(
    ({item, index}: {item: CourseItem; index: number}) => (
      <CourseCartCardComponent
        key={index}
        item={item}
        onRemove={() => dispatch(deleteCurrentCourseAppointment(item.id))}
      />
    ),
    [],
  );

  return (
    <View className="flex-1 bg-white">
      {/* <Text className="text-left text-4xl font-semibold py-2">My Classes</Text> */}
      <View className="flex h-full items-center justify-between">
        <FlatList
          className="w-screen"
          showsVerticalScrollIndicator={false}
          data={currentSchedule.courses}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={5}
          maxToRenderPerBatch={3}
        />
        <View className="bottom-0 border-t border-gray-100">
          <View className="w-screen flex flex-row justify-between items-center p-4 bg-blue-800">
            <Text className="text-xl font-semibold text-white">Total:</Text>
            <Text className="text-xl font-semibold text-white">
              {currentSchedule.courses.length}
            </Text>

            {/* <View className="flex flex-row justify-end gap-2 bottom-0">
              <TouchableOpacity className="rounded-lg bg-blue-600 px-5 py-3">
                <Text className="text-sm text-white text-center font-semibold">
                  Add to WebReg
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="rounded-lg bg-blue-600 px-5 py-3">
                <Text className="text-sm text-white text-center font-semibold">
                  Save
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CourseCartComponent;
