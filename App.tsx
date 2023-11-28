import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AppStackParamsList} from './screens.types';
import LoginComponent from './components/Auth/LoginComponent';
import SignupComponent from './components/Auth/SignupComponent';
import HomeComponent from './components/Home/HomeComponent';
import {Provider} from 'react-redux';
import {persistor, store} from './store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import WelcomeComponent from './components/Welcome/WelcomeComponent';
const AppStack = createNativeStackNavigator<AppStackParamsList>();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <AppStack.Navigator initialRouteName="Welcome">
                <AppStack.Screen
                  name="Welcome"
                  component={WelcomeComponent}
                  options={{headerShown: false}}
                />
                <AppStack.Screen
                  name="Login"
                  component={LoginComponent}
                  options={{headerShown: false}}
                />
                <AppStack.Screen
                  name="Signup"
                  component={SignupComponent}
                  options={{headerShown: false}}
                />
                <AppStack.Screen
                  name="Home"
                  component={HomeComponent}
                  options={{headerShown: false}}
                />
              </AppStack.Navigator>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
