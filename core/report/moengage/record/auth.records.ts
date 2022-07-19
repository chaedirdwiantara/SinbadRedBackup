import { SnbRecord, SnbSetAttribute } from '@core/report/moengage/index';
import ReactMoE from 'react-native-moengage';
import { TrackLogin, MoengageRecord, TrackLogout } from '../models';

export function trackUserLogin(props: MoengageRecord<TrackLogin>) {
  const { data, eventName } = props;
  ReactMoE.setAlias(data.userId);
  ReactMoE.setUserUniqueID(data.userId);
  ReactMoE.setUserName(data.userName);
  ReactMoE.setUserContactNumber(data.mobilePhone);

  const neededData = {
    owner_mobile_number: data.mobilePhone,
  };
  SnbRecord({ eventName, data: neededData });
  SnbSetAttribute({ data: neededData });
}

export function trackUserLogout(props: MoengageRecord<TrackLogout>) {
  const { data, eventName } = props;

  const neededData = {
    owner_mobile_number: data.mobilePhone,
  };
  SnbRecord({ eventName, data: neededData });
  ReactMoE.logout();
}
