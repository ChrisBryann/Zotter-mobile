import React from 'react';
import {useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {selectCurrent} from '../../store/Schedule/ScheduleSlice';
import {useAppSelector} from '../../store/hooks';

type Props = {id: string; onAddCourse: () => void; onRemoveCourse: () => void};

const CourseSearchResultCardActionButton = ({
  id,
  onAddCourse,
  onRemoveCourse,
}: Props) => {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const currentSchedule = useAppSelector(selectCurrent);
  useEffect(() => {
    setIsAdded(currentSchedule.courses.some(course => course.id === id));
  }, [currentSchedule.courses, id]);
  return !isAdded ? (
    <TouchableOpacity
      onPress={onAddCourse}
      className="self-end mr-2 p-2 rounded-full bg-blue-600">
      <Text className="text-yellow-400 font-bold">Add</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onRemoveCourse}
      className="self-end mr-2 p-2 rounded-full bg-red-600">
      <Text className="text-white font-bold">Remove</Text>
    </TouchableOpacity>
  );
};

export default CourseSearchResultCardActionButton;
