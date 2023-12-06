import React, {useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  InformationCircleIcon,
  PencilIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';
import {CourseSchedule} from '../../../store/types';

type ScheduleListCardProps = {
  item: CourseSchedule;
  Icon: any;
  hasLeftMargin: boolean;
};

const ScheduleListCardComponent = ({
  item,
  Icon,
  hasLeftMargin,
}: ScheduleListCardProps) => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);

  return (
    // <View className="flex flex-row justify-between my-2 px-2 py-2 rounded-lg mx-2 bg-gray-100 border border-gray-300">
    //   <View>
    //     <View className="flex-row gap-x-2 items-center">
    //       <Text className="text-xl font-bold text-gray-900">{item.title}</Text>
    //       <TouchableOpacity>
    //         <InformationCircleIcon />
    //       </TouchableOpacity>
    //     </View>

    //     <View className="mt-4">
    //       <Text className="text-md text-gray-700 font-semibold">
    //         {item.modified && `Last modified on: ${item.modified}`}
    //       </Text>
    //     </View>
    //   </View>
    //   <View className="flex-row gap-x-2">
    //     <TouchableOpacity>
    //       <PencilIcon />
    //       {/* on press, load the schedule to the schedule tab screen and then redirect it to the schedule tab once loaded */}
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <TrashIcon color={'red'} />
    //     </TouchableOpacity>
    //   </View>
    // </View>
    <TouchableOpacity
      className={`${
        hasLeftMargin && 'ml-2'
      } mb-2 flex-1 justify-center items-center bg-${
        randomBool ? 'blue-700' : 'gray-300'
      } rounded-xl shadow-md`}
      style={{height: randomBool ? 150 : 210}}>
      <Icon
        color={randomBool ? 'white' : 'black'}
        size={42}
        className="m-1 grow"
      />
      <Text
        className={`font-bold text-center text-xl p-2 ${
          randomBool && 'text-white'
        }`}>
        {item.title || 'Winter 2023 Schedule'}
      </Text>
    </TouchableOpacity>
  );
};

export default ScheduleListCardComponent;
