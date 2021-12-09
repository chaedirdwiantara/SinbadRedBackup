/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type ProductDetailCartInitialProps =
  models.DetailItemProps<models.ProductDetail>;
/** === INITIAL STATE === */
export const productDetailCartInitialState: ProductDetailCartInitialProps = {
  data: null,
  loading: false,
  refresh: false,
  error: null,
};
/** === REDUCER === */
export const productDetailCartReducer = simplifyReducer(
  productDetailCartInitialState,
  {
    /** => Process */
    [types.PRODUCT_DETAIL_CART_PROCESS]() {
      return {
        ...productDetailCartInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.PRODUCT_DETAIL_CART_SUCCESS](
      state = productDetailCartInitialState,
      { payload }: models.DetailSuccessAction<models.ProductDetail>,
    ) {
      return {
        ...state,
        data: payload.data,
        loading: false,
        error: null,
      };
    },
    /** => Failed */
    [types.PRODUCT_DETAIL_CART_FAILED](
      state = productDetailCartInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
    /** => Refresh */
    [types.PRODUCT_DETAIL_CART_REFRESH]() {
      return {
        ...productDetailCartInitialState,
        refresh: true,
      };
    },
    /** => Reset */
    [types.PRODUCT_DETAIL_CART_RESET]() {
      return productDetailCartInitialState;
    },
  },
);
