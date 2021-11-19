/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type PotentialPromoProductDetailInitialProps =
  models.DetailItemProps<models.PotentialPromoProductProps>;
/** === INITIAL STATE HERE === */
export const potentialPromoProductDetailInitialState: PotentialPromoProductDetailInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const potentialPromoProductDetailReducer = simplifyReducer(
  potentialPromoProductDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.POTENTIAL_PROMO_PRODUCT_PROCESS](
      state = potentialPromoProductDetailInitialState,
    ) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => detail success */
    [types.POTENTIAL_PROMO_PRODUCT_SUCCESS](
      state = potentialPromoProductDetailInitialState,
      action: models.DetailSuccessAction<models.PotentialPromoProductProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.POTENTIAL_PROMO_PRODUCT_FAILED](
      state = potentialPromoProductDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.POTENTIAL_PROMO_PRODUCT_RESET]() {
      return potentialPromoProductDetailInitialState;
    },
  },
);
