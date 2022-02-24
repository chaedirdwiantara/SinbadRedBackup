import React from 'react';
import {
  NavigationContainerRef,
  CommonActions,
  StackActions,
  TabActions,
} from '@react-navigation/native';

export const navigationRef: React.RefObject<NavigationContainerRef> =
  React.createRef();
/** => navigate to page */
export const navigate = (name: string, params?: object) => {
  navigationRef.current?.navigate(name, params);
};
/** => back to previews page */
export const back = () => {
  navigationRef.current?.goBack();
};
/** => back to first screen */
export const backToFirst = () => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};
/** => go to specific tab */
export const goToMenu = (
  name: 'HomeView' | 'HistoryListView' | 'HelpView' | 'UserView',
  params?: object,
) => {
  navigationRef.current?.navigate('Home');
  navigationRef.current?.dispatch(TabActions.jumpTo(name, params));
};
/** => back to specific page */
export const backToPage = (name: string) => {
  const data = navigationRef.current?.getRootState();
  const index = data?.routes.findIndex((d) => d.name === name);
  if (index && data?.routes.length) {
    navigationRef.current?.dispatch(
      StackActions.pop(data?.routes.length - (index + 1)),
    );
  }
};
/** => reset to home */
export const resetToHome = () => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    }),
  );
};
/** => reset to intro sinbad */
export const resetToIntroSinbad = () => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'OnBoardingView' }],
    }),
  );
};
