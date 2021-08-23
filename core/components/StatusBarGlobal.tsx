import React from 'react';
import { StatusBar } from 'react-native';

const StatusBarGlobal = () => {
  return (
    <StatusBar
      barStyle={'dark-content'}
      backgroundColor="transparent"
      translucent={true}
    />
  );
};

export default StatusBarGlobal;
