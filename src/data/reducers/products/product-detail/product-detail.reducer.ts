/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ProductDetailInitialProps =
  models.DetailItemProps<models.ProductDetailSuccessProps>;
/** === INITIAL STATE HERE === */
export const productDetailInitialState: ProductDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const productDetailReducer = simplifyReducer(productDetailInitialState, {
  /** === DETAIL === */
  /** => detail process */
  [types.PRODUCT_DETAIL_PROCESS]() {
    return {
      ...productDetailInitialState,
      loading: true,
    };
  },
  /** => detail success */
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
  /** => detail failed */
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
});
