import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {AppStackParamsList} from '../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginComponent = ({
  navigation,
}: NativeStackScreenProps<AppStackParamsList, 'Login'>) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-start pt-6 gap-4">
      <Text>Hello Login</Text>
      <View className="flex flex-row gap-2">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginComponent;
