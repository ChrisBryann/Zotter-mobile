import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AppStackParamsList} from '../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';

const WelcomeComponent = ({
  navigation,
}: NativeStackScreenProps<AppStackParamsList, 'Welcome'>) => {
  return (
    <SafeAreaView className="flex-1 py-6 justify-start items-center bg-white">
      {/* <Text className="text-4xl font-bold p-4"></Text> */}
      <Image
        source={require('../../assets/images/schedule.png')}
        className="w-full h-3/5"
        resizeMode="contain"
      />
      <View className="flex w-5/6">
        <Text className="font-bold text-4xl py-4">
          Welcome to <Text className="text-blue-600">Zotter</Text>
        </Text>
      </View>
      <View className="flex w-5/6">
        <Text className="font-semibold text-xl py-4">
          We take class scheduling to another level.
        </Text>
      </View>
      <TouchableOpacity
        className="p-4 w-5/6 bg-blue-600 rounded-full my-4 shadow-md"
        onPress={() => navigation.navigate('Home')}>
        <Text className="font-bold text-center text-white text-md">
          Get started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeComponent;
