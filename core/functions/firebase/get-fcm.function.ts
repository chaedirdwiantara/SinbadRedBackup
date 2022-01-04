/** === IMPORT PACKAGE HERE === */
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { useDataPermanent } from '@core/redux/Data';
import {
  saveFCMNotLogin,
  deleteFcmByDeviceId,
} from '@core/functions/firebase/fcm-firestore.function';
import * as Actions from '@actions';
/** === FUNCTION === */
/** => get FCM token from firebase */
const useGetTokenNotLogin = async () => {
  const data = useDataPermanent();
  const dispatch = useDispatch();
  if (!data.isFCM) {
    deleteFcmByDeviceId().then(async (d) => {
      if (d || d === undefined) {
        try {
          saveFCMNotLogin(await messaging().getToken());
          dispatch(Actions.isFCM(true));
        } catch (err) {
          console.error('get token failed', err);
        }
      }
    });
  }
};
/** === EXPORT === */
export { useGetTokenNotLogin };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
