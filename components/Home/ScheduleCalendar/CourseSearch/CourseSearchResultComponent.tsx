import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CourseSearchScreenParamsList} from '../../../../screens.types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import CourseSearchResultCardComponent from './CourseSearchResultCardComponent';
import FlatListItemSeparator from '../../../UI/FlatListItemSeparator';
import {CourseSearchResult} from '../../../../store/types';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {BarChart} from 'react-native-chart-kit';
import Config from 'react-native-config';
const CourseSearchResultComponent = ({
  route,
  navigation,
}: NativeStackScreenProps<
  CourseSearchScreenParamsList,
  'CourseSearchResult'
>) => {
  const coursesData: CourseSearchResult[] = route.params.coursesData;
  const [courses, setCourses] = useState<CourseSearchResult[]>(coursesData);
  const [searchCourse, setSearchCourse] = useState<string>('');
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const classStatisticsRef = useRef<BottomSheetModal>(null);
  const [selectedClass, setSelectedClass] = useState<string>('');

  const [selectedClassStatistic, setSelectedClassStatistic] = useState<{
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
    NP: number;
    P: number;
    averageGPA: number;
  }>({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
    NP: 0,
    P: 0,
    averageGPA: 0,
  });

  // callbacks
  const handleSheetChange = useCallback((index: number) => {
    console.log('handleSheetChange', index);
  }, []);
  // const handleSnapPress = useCallback((index: number) => {
  //   classStatisticsRef.current?.snapToIndex(index);
  // }, []);
  // const handleClosePress = useCallback(() => {
  //   classStatisticsRef.current?.close();
  // }, []);
  const handleExpandPress = useCallback(() => {
    classStatisticsRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  const showStatistics = useCallback(
    (name: string) => {
      setSelectedClass(name);

      // set loading

      setIsLoading(true);

      fetch(
        `${Config.BACKEND_API_URL}/get-class-statistic?` +
          new URLSearchParams({
            department: name.split(' ')[0],
            number: name.split(' ')[1],
          }),
      )
        .then(async data => {
          const {status, ...res} = await data.json();
          setSelectedClassStatistic(res);
          handleExpandPress();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleExpandPress],
  );

  const renderItems = useCallback(
    ({item, index}: {item: CourseSearchResult; index: number}) => (
      <CourseSearchResultCardComponent
        showStatistics={showStatistics}
        key={index}
        item={item}
      />
    ),
    [showStatistics],
  );

  // bar chart
  const barData = {
    labels: ['A', 'B', 'C', 'D', 'F', 'P', 'NP'],
    datasets: [
      {
        data: Object.values(selectedClassStatistic),
      },
    ],
  };

  return (
    <View style={{paddingTop: insets.top}} className="flex-1 bg-white pt-2">
      <View className="flex flex-row items-center justify-evenly my-2 px-2 w-screen top-0">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          value={searchCourse}
          onChangeText={(text: string) => {
            setSearchCourse(text);
            text = text.toLowerCase();
            setCourses(
              coursesData.filter(
                course =>
                  `${course.deptCode.toLowerCase()} ${course.courseNumber.toLowerCase()} - ${course.courseTitle.toLowerCase()}`.indexOf(
                    text,
                  ) > -1,
              ),
            );
          }}
          className="border border-gray-400 rounded-lg p-2 w-10/12"
          clearButtonMode="always"
        />
      </View>
      <FlatList
        data={courses}
        className="w-screen"
        showsVerticalScrollIndicator={false}
        renderItem={renderItems}
        ItemSeparatorComponent={FlatListItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        maxToRenderPerBatch={3}
      />
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={classStatisticsRef}
          onChange={handleSheetChange}
          backdropComponent={renderBackdrop}
          enableDynamicSizing
          enablePanDownToClose
          enableDismissOnClose>
          <BottomSheetView>
            <View className="flex items-center justify-center">
              <Text className="font-semibold">
                {selectedClass} | GPA: {selectedClassStatistic.averageGPA}
              </Text>
              <BarChart
                style={{}}
                data={barData}
                width={Dimensions.get('window').width - 10}
                height={270}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundGradientFrom: '#FFFF',
                  backgroundGradientTo: '#FFFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(30, 64, 175, ${opacity})`,
                  barPercentage: 0.65,
                  propsForLabels: {
                    fontWeight: 'bold',
                  },
                  propsForVerticalLabels: {
                    fontSize: 15,
                    rotation: 0,
                  },
                }}
                verticalLabelRotation={30}
              />
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
};

export default CourseSearchResultComponent;
