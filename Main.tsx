import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, Persistor } from './core/redux/Store';
import StatusBarGlobal from './core/components/StatusBarGlobal';
import MainNavigator from './core/navigations/MainNavigator';

const Main = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <StatusBarGlobal />
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
};

export default Main;
