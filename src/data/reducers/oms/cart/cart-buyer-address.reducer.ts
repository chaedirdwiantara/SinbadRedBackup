/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CartBuyerAddressInitialProps =
  models.DetailItemProps<models.CartBuyerAddress>;
/** === INITIAL STATE HERE === */
export const cartBuyerAddressInitialState: CartBuyerAddressInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const cartBuyerAddressReducer = simplifyReducer(
  cartBuyerAddressInitialState,
  {
    /** => PROCESS */
    [types.CART_BUYER_ADDRESS_PROCESS]() {
      return {
        ...cartBuyerAddressInitialState,
        loading: true,
      };
    },
    /** => SUCCESS */
    [types.CART_BUYER_ADDRESS_SUCCESS](
      state = cartBuyerAddressInitialState,
      action: models.DetailSuccessAction<models.CartBuyerAddress>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => FAILED */
    [types.CART_BUYER_ADDRESS_FAILED](
      state = cartBuyerAddressInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.CART_BUYER_ADDRESS_RESET]() {
      return cartBuyerAddressInitialState;
    },
  },
);
