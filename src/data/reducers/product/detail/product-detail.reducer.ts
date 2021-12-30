/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type ProductDetailInitialProps =
  models.DetailItemProps<models.ProductDetail>;
/** === INITIAL STATE === */
export const productDetailInitialState: ProductDetailInitialProps = {
  data: null,
  loading: false,
  refresh: false,
  error: null,
};
/** === REDUCER === */
export const productDetailReducer = simplifyReducer(productDetailInitialState, {
  /** => Process */
  [types.PRODUCT_DETAIL_PROCESS]() {
    return {
      ...productDetailInitialState,
      loading: true,
    };
  },
  /** => Succeeded */
  [types.PRODUCT_DETAIL_SUCCESS](
    state = productDetailInitialState,
    { payload }: models.DetailSuccessAction<models.ProductDetail>,
  ) {
    return {
      ...state,
      data: payload.data,
      loading: false,
      error: null,
      refresh: false,
    };
  },
  /** => Failed */
  [types.PRODUCT_DETAIL_FAILED](
    state = productDetailInitialState,
    { payload }: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  },
  /** => Refresh */
  [types.PRODUCT_DETAIL_REFRESH]() {
    return {
      ...productDetailInitialState,
      refresh: true,
    };
  },
  /** => Reset */
  [types.PRODUCT_DETAIL_RESET]() {
    return productDetailInitialState;
  },
});
