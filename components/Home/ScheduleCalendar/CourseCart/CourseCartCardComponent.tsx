import React from 'react';
import {Text, View} from 'react-native';

type CourseCartCardProps = {
  item: string;
};

const CourseCartCardComponent = ({item}: CourseCartCardProps) => {
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
};

export default CourseCartCardComponent;
