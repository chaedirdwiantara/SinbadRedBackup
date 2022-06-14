import { SnbRecord } from '../../../../core/report/moengage/index';
import { MoengageRecord, TrackCompletionData } from '../models';
import ReactMoE from 'react-native-moengage';

export function trackCompletionData(
  props: MoengageRecord<TrackCompletionData>,
) {
  const { data, eventName } = props;

  var neededData = [];
  switch (eventName) {
    case 'OwnerDataStep1':
      if (data?.dataUser?.name) {
        ReactMoE.setUserName(data?.dataUser?.name);
      }
      neededData.push({
        owner_name: data?.dataUser?.name,
        owner_ktp: data.dataUser.idNo,
      });
      break;
    case 'OwnerDataStep2':
      neededData.push({
        tax_image_url: data?.dataUser?.taxImageUrl,
        owner_tax_number: data.dataUser.taxNo,
      });
      break;
    case 'OwnerDataStep3':
      neededData.push({
        selfie_image_url: data?.dataUser?.selfieImageUrl,
      });
      break;
    case 'OwnerDataStep4':
      neededData.push({
        owner_email: data?.dataUser?.email,
      });
      break;
    case 'StoreDataStep1':
      neededData.push({
        store_name: data?.dataBuyer?.name,
        store_number: data?.dataBuyer?.phoneNo,
      });
      break;
    case 'StoreDataStep2':
      neededData.push({
        store_image_url: data?.dataBuyer?.imageUrl,
      });
      break;
    case 'StoreDataStep3':
      neededData.push({
        coordinate_location: `${data?.dataBuyer?.longitude}, ${data?.dataBuyer.longitude}`,
        store_address: data?.dataBuyer?.address,
        address_note: data?.dataBuyer?.noteAddress,
        vehicle_accessibility_id: data?.dataBuyer?.vehicleAccessibilityId,
        vehicle_accessibility_amount:
          data?.dataBuyer?.vehicleAccessibilityAmount,
      });
      break;
    default:
      break;
  }

  SnbRecord({ eventName, data: neededData[0] });
}
