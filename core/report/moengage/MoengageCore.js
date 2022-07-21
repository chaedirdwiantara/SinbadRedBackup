import React, { useEffect } from 'react';
import ReactMoE, { MoEAppStatus } from 'react-native-moengage';
import DeviceInfo from 'react-native-device-info';
import { useDataPermanent } from '@core/redux/Data';
import { useSaveAppVersion } from '../../functions/hook/permanent-hook.function';
import RNInstallReferrer from 'react-native-install-referrer';
import { SnbRecord } from './index';
import * as eventName from 'core/report/moengage/event';

const MoengageCore = () => {
  const { saveAppVersion } = useSaveAppVersion();
  const permanentData = useDataPermanent();
  useEffect(() => {
    ReactMoE.initialize();
    checkAppVersion();
  }, []);
  const checkAppVersion = () => {
    if (permanentData.appVersion === null) {
      ReactMoE.setAppStatus(MoEAppStatus.Install);
      saveAppVersion(DeviceInfo.getBuildNumber());
      RNInstallReferrer.getReferrer().then((referrer) => {
        let installReferrer = referrer.installReferrer;
        installReferrer = installReferrer.split('&');

        let installSource = {};
        installSource.installTimestamp = referrer.installTimestamp;
        installSource.clickTimestamp = referrer.clickTimestamp;
        installReferrer.map((data, index) => {
          let split = data.split('=');
          return (installSource[split.shift()] = split.pop());
        });
        SnbRecord(eventName.INSTALL_SOURCE, installSource);
      });
    }

    if (permanentData.appVersion !== null) {
      if (permanentData.appVersion !== DeviceInfo.getBuildNumber()) {
        ReactMoE.setAppStatus(MoEAppStatus.Update);
        saveAppVersion(DeviceInfo.getBuildNumber());
      }
    }
  };
  return <></>;
};

export default MoengageCore;
