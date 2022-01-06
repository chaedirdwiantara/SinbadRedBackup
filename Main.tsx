import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, Persistor } from './core/redux/Store';
import StatusBarGlobal from './core/components/StatusBarGlobal';
import MainNavigator from './core/navigations/MainNavigator';
import PushNotification from './core/components/PushNotification';
import SentryCore from './core/report/sentry/SentryCore';
import { SnbToast } from '@sinbad/react-native-sinbad-ui';

const Main = () => {
  return (
    <SentryCore>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <StatusBarGlobal />
          <PushNotification />
          <MainNavigator />
          <SnbToast />
        </PersistGate>
      </Provider>
    </SentryCore>
  );
};

export default Main;
