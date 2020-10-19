import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {navigationRef} from '../components/RootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';

const Stack = createStackNavigator();

class StackNavigator extends React.Component {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            animation="fade"
            screenOptions={{
              animationEnabled: true,
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
              ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default StackNavigator;
