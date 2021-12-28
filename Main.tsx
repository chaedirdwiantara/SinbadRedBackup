import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, Persistor } from './core/redux/Store';
import StatusBarGlobal from './core/components/StatusBarGlobal';
import MainNavigator from './core/navigations/MainNavigator';
import PushNotification from './core/components/PushNotification';

const Main = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <StatusBarGlobal />
        <PushNotification />
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
};

export default Main;
