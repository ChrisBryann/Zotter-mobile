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
import {CourseSearchResult} from '../../../../store/types';
import Config from 'react-native-config';
import {toast} from '@baronha/ting';
import DropdownSelect from 'react-native-input-select';

const CourseSearchFormComponent = ({
  navigation,
}: NativeStackScreenProps<
  CourseSearchScreenParamsList,
  'CourseSearchForm'
>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);

  const [term, setTerm] = useState<{value: string; label: string}[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string>('');

  const [GE, setGE] = useState<{value: string; label: string}[]>([]);
  const [selectedGE, setSelectedGE] = useState<string>('');

  const [dept, setDept] = useState<{value: string; label: string}[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    const getFormInfo = () => {
      // set loading here
      setIsLoading(true);
      fetch(`${Config.BACKEND_API_URL}/get-form-info`)
        .then(async data => {
          const res = await data.json();

          setTerm(
            res.terms.map((t: string) => ({
              label: t,
              value: t,
            })),
          );
          setSelectedTerm(res.terms[0] as string);
          setDept(
            res.departments.map((d: {type: string; value: string}) => ({
              value: d.type,
              label: d.value,
            })),
          );
          setSelectedDept(res.departments[0].type as string);
          setGE(
            res.genEducation.map((g: {type: string; value: string}) => ({
              value: g.type,
              label: g.value,
            })),
          );
          setSelectedGE(res.genEducation[0].type as string);
        })
        .catch(err => {
          toast({
            title: 'Error displaying UCI classes!',
            message: 'Check your connection and try again.',
            preset: 'error',
            backgroundColor: '#f3f4f6',
            titleColor: '#CC3333',
          });
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
    setIsSearchLoading(true);
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
          toast({
            title: 'No classes available!',
            preset: 'error',
            backgroundColor: '#f3f4f6',
            titleColor: '#CC3333',
          });
          console.log('no classes!');
        }
      })
      .catch(err => {
        toast({
          title: 'No classes available!',
          preset: 'error',
          backgroundColor: '#f3f4f6',
          titleColor: '#CC3333',
        });
        console.log(err.message);
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading ? (
        <View className="h-full flex justify-center items-center">
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View className="h-full">
          <Text className="p-4 pt-0 text-4xl text-center font-bold">
            Search Classes
          </Text>
          <ScrollView>
            <View className="flex items-center">
              <View className="w-10/12">
                <Text className="text-lg font-semibold">Term</Text>
                <DropdownSelect
                  placeholder={term[0]?.label ?? ''}
                  options={term}
                  selectedValue={selectedTerm}
                  onValueChange={setSelectedTerm}
                  isSearchable={true}
                />
              </View>
              <View className="w-10/12">
                <Text className="text-lg font-semibold">General Education</Text>
                <DropdownSelect
                  placeholder={GE[0]?.label ?? ''}
                  options={GE}
                  selectedValue={selectedGE}
                  onValueChange={setSelectedGE}
                  isSearchable={true}
                />
              </View>
              <View className="w-10/12">
                <Text className="text-lg font-semibold">Department</Text>
                <DropdownSelect
                  placeholder={dept[0]?.label ?? ''}
                  options={dept}
                  selectedValue={selectedDept}
                  onValueChange={setSelectedDept}
                  isSearchable={true}
                />
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={onSubmitHandler}
            className="w-10/12 bg-blue-600 p-2 rounded-lg mx-auto my-4">
            {isSearchLoading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text className="text-center text-lg text-white font-semibold">
                Search
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CourseSearchFormComponent;
