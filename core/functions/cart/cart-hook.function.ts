/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION === */
import { useDataPermanent } from '@core/redux/Data';
import * as Actions from '../../data/actions';
/** === FUNCTION === */
export const useCartId = () => {
  const dataPermanent = useDataPermanent();
  const dispatch = useDispatch();
  return {
    getCartId: dataPermanent.cartId,
    setCartId: (value: string | null) => {
      dispatch(Actions.cartId(value));
    },
  };
};
