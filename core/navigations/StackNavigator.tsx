import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import Navigations from '../../src/navigations';
import TabNavigator from './TabNavigator';
/** => for intro view */
import { IntroSplashView, IntroSinbadView } from '../screens/intro/views';

const { Navigator, Screen } = createNativeStackNavigator();
enableScreens();

const StackNavigator: React.FC = () => {
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
  /** => this for intro sinbad */
  const IntroSinbadNav = () => {
    return (
      <Screen
        name="IntroSinbad"
        component={IntroSinbadView}
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
    <Navigator initialRouteName={'BuyerCategoryView'}>
      {IntroSplashNav()}
      {IntroSinbadNav()}
      {tabNav()}
      {projectNav()}
    </Navigator>
  );
};

export default StackNavigator;
