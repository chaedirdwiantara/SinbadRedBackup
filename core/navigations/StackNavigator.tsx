import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Navigations from '../../src/navigations';
import TabNavigator from './TabNavigator';
/** => for intro view */
import { IntroSplashView } from '../screens/intro/views';
import {
  FirstView,
  ForceUpdateView,
  MaintenanceView,
  BannedACcountView
} from '../screens/extra/views';

const { Navigator, Screen } = createNativeStackNavigator();
enableScreens();

const StackNavigator: React.FC = () => {
  /** => this for maintenance app */
  const BannedAccountNav = () => {
    return (
      <Screen
        name="BannedAccount"
        component={BannedACcountView}
        options={{ headerShown: false, screenOrientation: 'portrait' }}
      />
    );
  };
  /** => this for maintenance app */
  const MaintenanceNav = () => {
    return (
      <Screen
        name="Maintenance"
        component={MaintenanceView}
        options={{ headerShown: false, screenOrientation: 'portrait' }}
      />
    );
  };
  /** => this for force update */
  const ForceUpdateNav = () => {
    return (
      <Screen
        name="ForceUpdate"
        component={ForceUpdateView}
        options={{ headerShown: false, screenOrientation: 'portrait' }}
      />
    );
  };
  /** => this for intro splash */
  const IntroSplashNav = () => {
    return (
      <Screen
        name="Splash"
        component={IntroSplashView}
        options={{ headerShown: false, screenOrientation: 'portrait' }}
      />
    );
  };
  /** => this for first view */
  const FirstNav = () => {
    return (
      <Screen
        name="First"
        component={FirstView}
        options={{ headerShown: false, screenOrientation: 'portrait' }}
      />
    );
  };
  /** => this for home (tab navigation) */
  const tabNav = () => {
    return (
      <Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
          stackAnimation: 'none',
          screenOrientation: 'portrait',
        }}
      />
    );
  };
  /** => this all module page */
  const projectNav = () => {
    return Object.entries({
      ...Navigations,
    }).map(([name, props]) => (
      <Screen
        key={name}
        name={name}
        component={props.component}
        options={{
          headerShown: false,
          stackAnimation: 'slide_from_right',
          screenOrientation: 'portrait',
        }}
      />
    ));
  };

  return (
    <Navigator initialRouteName={'First'}>
      {FirstNav()}
      {MaintenanceNav()}
      {ForceUpdateNav()}
      {IntroSplashNav()}
      {tabNav()}
      {projectNav()}
      {BannedAccountNav()}
    </Navigator>
  );
};

export default StackNavigator;
