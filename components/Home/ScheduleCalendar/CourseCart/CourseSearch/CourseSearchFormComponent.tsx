import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CourseSearchScreenParamsList} from '../../../../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Select} from '@mobile-reality/react-native-select-pro';
import {SelectList} from 'react-native-dropdown-select-list';

const CourseSearchFormComponent = ({
  navigation,
}: NativeStackScreenProps<
  CourseSearchScreenParamsList,
  'CourseSearchForm'
>) => {
  const [term, setTerm] = useState<{value: string; key: string}[]>([
    {
      value: 'Option 1',
      key: 'option1',
    },
    {
      value: 'Option 2',
      key: 'option2',
    },
    {
      value: 'Option 3',
      key: 'option3',
    },
    {
      value: 'Option 4',
      key: 'option4',
    },
  ]);
  const [selectedTerm, setSelectedTerm] = useState<string>('');

  const [GE, setGE] = useState<{value: string; key: string}[]>([
    {
      value: 'Option 1',
      key: 'option1',
    },
    {
      value: 'Option 2',
      key: 'option2',
    },
    {
      value: 'Option 3',
      key: 'option3',
    },
    {
      value: 'Option 4',
      key: 'option4',
    },
  ]);
  const [selectedGE, setSelectedGE] = useState<string>('');

  const [dept, setDept] = useState<{value: string; key: string}[]>([
    {
      value: 'Option 1',
      key: 'option1',
    },
    {
      value: 'Option 2',
      key: 'option2',
    },
    {
      value: 'Option 3',
      key: 'option3',
    },
    {
      value: 'Option 4',
      key: 'option4',
    },
  ]);
  const [selectedDept, setSelectedDept] = useState<string>('');

  return (
    <SafeAreaView className="flex-1 bg-white h-full">
      <Text className="p-4 pt-0 text-4xl text-center font-bold">Search Classes</Text>
      <ScrollView>
        <View className="flex items-center gap-6">
          <View className="w-10/12 gap-y-2">
            <Text className="text-lg font-semibold">Term {selectedTerm}</Text>
            <SelectList data={term} setSelected={setSelectedTerm} save="key" />
          </View>
          <View className="w-10/12">
            <Text className="text-lg font-semibold">General Education</Text>
            <SelectList data={term} setSelected={setSelectedTerm} save="key" />
          </View>
          <View className="w-10/12">
            <Text className="text-lg font-semibold">Department</Text>
            <SelectList data={term} setSelected={setSelectedTerm} save="key" />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          let classesData: string[] = [];
          // do some fetching on peterportal api to get classes result and make some loading component
          navigation.navigate('CourseSearchResult', {classesData});
        }}
        className="w-10/12 bg-blue-600 p-2 rounded-lg mx-auto my-4">
        <Text className="text-center text-lg text-white font-semibold">
          Search
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CourseSearchFormComponent;
