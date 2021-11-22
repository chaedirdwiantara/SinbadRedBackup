/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION === */
import { useDataCheckout } from '@core/redux/Data';
import * as Actions from '../../data/actions';
import * as models from '@models';
/** === FUNCTION === */
export const useCheckoutMaster = () => {
  const dataCheckout = useDataCheckout();
  const dispatch = useDispatch();
  return {
    getCheckoutMaster: dataCheckout,
    setCheckoutInvoiceBrand: (data: models.CheckoutDataMaster) => {
      dispatch(Actions.updateCheckoutInvoiceBrand(data));
    },
  };
};
