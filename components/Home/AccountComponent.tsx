import React from 'react';
import {Text} from 'react-native';
import {HomeTabParamsList} from '../../screens.types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

const AccountComponent = ({
  navigation,
}: BottomTabScreenProps<HomeTabParamsList, 'Account'>) => {
  return (
    <SafeAreaView className="flex-1 p-6 gap-4 bg-white">
      <Text className="text-left text-4xl font-semibold py-2">
        Account Information
      </Text>
    </SafeAreaView>
  );
};

export default AccountComponent;
