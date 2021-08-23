import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { navigationRef } from './RootNavigation';
import { CoreProvider } from '../contexts/CoreProvider';

const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <CoreProvider>
        <StackNavigator />
      </CoreProvider>
    </NavigationContainer>
  );
};

export default MainNavigator;
