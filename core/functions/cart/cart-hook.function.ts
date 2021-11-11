/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION === */
import { useDataPermanent, useDataCart } from '@core/redux/Data';
import * as Actions from '../../data/actions';
import * as models from '@models';
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

export const useCartVerification = () => {
  const dataCart = useDataCart();
  const dispatch = useDispatch();
  return {
    getCartVerification: dataCart,
    setCartVerification: (data: models.CartSuccessProps) => {
      dispatch(Actions.verificationCart(data));
    },
  };
};
