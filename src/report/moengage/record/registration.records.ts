import { SnbRecord } from '../../../../core/report/moengage/index';
import { MoengageRecord, TrackRegistrationSuccessData } from '../models';
import ReactMoE from 'react-native-moengage';

export function trackRegistration(
  props: MoengageRecord<TrackRegistrationSuccessData>,
) {
  const { data, eventName } = props;
  ReactMoE.setAlias(data.owner_id);
  ReactMoE.setUserUniqueID(data.owner_id);
  ReactMoE.setUserName(data.owner_mobile_number);
  ReactMoE.setUserContactNumber(data.owner_mobile_number);
  const neededData = {
    unique_id: data.unique_id,
    owner_id: data.owner_id,
    owner_mobile_number: data.owner_mobile_number,
    store_id: data.store_id,
    store_category: data.store_category,
    product_category: data.product_category,
    location: data.location,
  };

  SnbRecord({ eventName, data: neededData });
}
