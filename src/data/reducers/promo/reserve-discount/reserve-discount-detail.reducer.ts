/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ReserveDiscountDetailInitialProps =
  models.DetailItemProps<models.ReserveDiscountDetail>;
/** === INITIAL STATE HERE === */
export const reserveDiscountDetailInitialState: ReserveDiscountDetailInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const reserveDiscountDetailReducer = simplifyReducer(
  reserveDiscountDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.DETAIL_RESERVE_DISCOUNT_PROCESS](
      state = reserveDiscountDetailInitialState,
    ) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => detail success */
    [types.DETAIL_RESERVE_DISCOUNT_SUCCESS](
      state = reserveDiscountDetailInitialState,
      action: models.DetailSuccessAction<models.PotentialPromoProductProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.DETAIL_RESERVE_DISCOUNT_FAILED](
      state = reserveDiscountDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.DETAIL_RESERVE_DISCOUNT_RESET]() {
      return reserveDiscountDetailInitialState;
    },
  },
);
