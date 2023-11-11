import React from 'react';
import {Text} from 'react-native';
import {HomeTabParamsList} from '../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

const AccountComponent = ({
  navigation,
}: BottomTabScreenProps<HomeTabParamsList, 'Account'>) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-start pt-6 gap-4">
      <Text>Hello Account</Text>
    </SafeAreaView>
  );
};

export default AccountComponent;
