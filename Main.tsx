import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, Persistor } from './core/redux/Store';
import StatusBarGlobal from './core/components/StatusBarGlobal';
import MainNavigator from './core/navigations/MainNavigator';
import PushNotification from './core/components/PushNotification';
import SentryCore from './core/report/sentry/SentryCore';
import Toast from './core/components/Toast';
import { BottomSheetModalProvider } from '@sinbad/react-native-sinbad-ui/src/utils/thirdParty';
import MoengageCore from '@core/report/moengage/MoengageCore';

const Main = () => {
  return (
    <SentryCore>
      <BottomSheetModalProvider>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={Persistor}>
            <StatusBarGlobal />
            <PushNotification />
            <MainNavigator />
            <Toast />
            <MoengageCore />
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </SentryCore>
  );
};

export default Main;
