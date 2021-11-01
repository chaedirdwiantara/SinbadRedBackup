/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type ProductDetailInitialProps =
  models.DetailItemProps<models.ProductDetailSuccessProps>;
/** === INITIAL STATE === */
export const productDetailInitialState: ProductDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
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
    action: models.DetailSuccessAction<models.ProductDetailSuccessProps>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => Failed */
  [types.PRODUCT_DETAIL_FAILED](
    state = productDetailInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => Reset */
  [types.PRODUCT_DETAIL_RESET]() {
    return productDetailInitialState;
  },
});
