import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { navigationRef } from './RootNavigation';
import { CoreProviders } from '../contexts/CoreProviders';

const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <CoreProviders>
        <StackNavigator />
      </CoreProviders>
    </NavigationContainer>
  );
};

export default MainNavigator;
