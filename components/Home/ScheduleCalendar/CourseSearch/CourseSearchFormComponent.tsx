import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CourseSearchScreenParamsList} from '../../../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {CourseSearchResult} from '../../../../store/types';

const CourseSearchFormComponent = ({
  navigation,
}: NativeStackScreenProps<
  CourseSearchScreenParamsList,
  'CourseSearchForm'
>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [term, setTerm] = useState<{value: string; key: string}[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string>('');

  const [GE, setGE] = useState<{value: string; key: string}[]>([]);
  const [selectedGE, setSelectedGE] = useState<string>('');

  const [dept, setDept] = useState<{value: string; key: string}[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    const getFormInfo = async () => {
      // set loading here
      setIsLoading(true);
      await fetch('https://zotter-4e7fd16e0ef2.herokuapp.com/get-form-info')
        .then(async data => {
          const res = await data.json();

          setTerm(
            res.terms.map((t: string) => ({
              key: t,
              value: t,
            })),
          );
          setSelectedTerm(res.terms[0] as string);
          setDept(
            res.departments.map((d: {type: string; value: string}) => ({
              key: d.type,
              value: d.value,
            })),
          );
          setSelectedDept(res.departments[0].type as string);
          setGE(
            res.genEducation.map((g: {type: string; value: string}) => ({
              key: g.type,
              value: g.value,
            })),
          );
          setSelectedGE(res.genEducation[0].type as string);
        })
        .catch(err => {
          console.log(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    getFormInfo();

    return () => {
      controller.abort(); // cancel the fetch request
    };
  }, []);

  const onSubmitHandler = () => {
    setIsLoading(true);
    fetch(
      'https://api.peterportal.org/rest/v0/schedule/soc?' +
        new URLSearchParams({
          term: selectedTerm,
          department: selectedDept,
          ge: selectedGE,
        }),
    )
      .then(async data => {
        const res = await data.json();
        if (res.schools.length !== 0) {
          const coursesData = res.schools[0].departments[0]
            .courses as CourseSearchResult[];
          navigation.navigate('CourseSearchResult', {coursesData});
        } else {
          // indicates that no classes are found with those criteria
          console.log('no classes!');
        }
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <SafeAreaView className="flex-1 bg-white h-full">
      <Text className="p-4 pt-0 text-4xl text-center font-bold">
        Search Classes
      </Text>
      <ScrollView>
        <View className="flex items-center gap-6">
          <View className="w-10/12 gap-y-2">
            <Text className="text-lg font-semibold">Term</Text>
            <SelectList
              defaultOption={term[0]}
              data={term}
              setSelected={setSelectedTerm}
              save="key"
            />
          </View>
          <View className="w-10/12">
            <Text className="text-lg font-semibold">General Education</Text>
            <SelectList
              defaultOption={GE[0]}
              data={GE}
              setSelected={setSelectedGE}
              save="key"
            />
          </View>
          <View className="w-10/12">
            <Text className="text-lg font-semibold">Department</Text>
            <SelectList
              defaultOption={dept[0]}
              data={dept}
              setSelected={setSelectedDept}
              save="key"
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={onSubmitHandler}
        className="w-10/12 bg-blue-600 p-2 rounded-lg mx-auto my-4">
        {isLoading ? (
          <ActivityIndicator size="small" color={'white'} />
        ) : (
          <Text className="text-center text-lg text-white font-semibold">
            Search
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CourseSearchFormComponent;
