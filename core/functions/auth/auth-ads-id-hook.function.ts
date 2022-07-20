/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
import RNAdvertisingId from 'react-native-advertising-id';
import { useDataPermanent } from '@core/redux/Data';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '../../data/actions';
/** === FUNCTION === */
/** => call auth action */
const useAdsID = () => {
  const dispatch = useDispatch();
  const advertisingId = useDataPermanent().advertisingId;
  return {
    saveAdsID: () => {
      if (advertisingId === '') {
        RNAdvertisingId.getAdvertisingId()
          .then((response) => {
            dispatch(Actions.saveAdsID(response.advertisingId));
          })
          .catch((error) => console.error(error));
      }
    },
  };
};
/** === EXPORT === */
export { useAdsID };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 30062022
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
