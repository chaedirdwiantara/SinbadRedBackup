/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
import { useCheckoutMaster } from '@screen/oms/functions/checkout';
/** === TYPE === */
export type CartTotalProductInitialProps =
  models.DetailItemProps<models.CartTotalProductSuccess>;
/** === INITIAL STATE === */
export const cartTotalProductInitialState: CartTotalProductInitialProps = {
  data: null,
  error: null,
  loading: false,
  refresh: false,
};
/** === REDUCER === */
export const cartTotalProductReducer = simplifyReducer(
  cartTotalProductInitialState,
  {
    /** => Process */
    [types.CART_TOTAL_PRODUCT_PROCESS]() {
      return {
        ...cartTotalProductInitialState,
        loading: true,
      };
    },
    /** => Success */
    [types.CART_TOTAL_PRODUCT_SUCCESS](
      state = cartTotalProductInitialState,
      { payload }: models.DetailSuccessAction<models.CartTotalProductSuccess>,
    ) {
      const { setCartId } = useCheckoutMaster();
      setCartId({ cartId: payload.data.cartId });
      return {
        ...state,
        data: payload.data,
        loading: false,
        error: null,
      };
    },
    /** => Failed */
    [types.CART_TOTAL_PRODUCT_FAILED](
      state = cartTotalProductInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    },
    /** => Refresh */
    [types.CART_TOTAL_PRODUCT_REFRESH]() {
      return {
        ...cartTotalProductInitialState,
        loading: true,
      };
    },
    /** => Reset */
    [types.CART_TOTAL_PRODUCT_RESET]() {
      return cartTotalProductInitialState;
    },
  },
);
