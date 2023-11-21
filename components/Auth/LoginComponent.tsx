import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AppStackParamsList} from '../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const LoginComponent = ({
  navigation,
}: NativeStackScreenProps<AppStackParamsList, 'Login'>) => {
  return (
    <SafeAreaView className="flex-1 my-6 justify-start items-center bg-white">
      {/* <Text className="text-4xl font-bold p-4"></Text> */}
      <Image
        source={require('../../assets/images/signup.png')}
        className="w-full h-2/5"
        resizeMode="contain"
      />
      <View className="flex w-5/6">
        <Text className="font-bold text-4xl py-4">Welcome</Text>
      </View>
      <View className="flex w-5/6 my-1">
        <Text className="font-semibold py-2">Email</Text>
        <TextInput className="w-full rounded-md border-b border-gray-300 py-1" />
      </View>
      <View className="flex w-5/6 my-1">
        <Text className="font-semibold py-2">Password</Text>
        <TextInput
          secureTextEntry={true}
          className="w-full rounded-md border-b border-gray-300 py-1"
        />
      </View>
      <TouchableOpacity
        className="p-4 w-5/6 bg-blue-600 rounded-full my-4 shadow-md"
        onPress={() => navigation.navigate('Home')}>
        <Text className="font-bold text-center text-white text-md">
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text className="text-blue-800 font-semibold">
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginComponent;
