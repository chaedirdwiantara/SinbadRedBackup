/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ReserveDiscountDeleteInitialProps = models.DeleteItemProps;
/** === INITIAL STATE HERE === */
export const reserveDiscountDeleteInitialState: ReserveDiscountDeleteInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const reserveDiscountDeleteReducer = simplifyReducer(
  reserveDiscountDeleteInitialState,
  {
    /** ===> DELETE */
    /** => process */
    [types.DELETE_RESERVE_DISCOUNT_PROCESS]() {
      return {
        ...reserveDiscountDeleteInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.DELETE_RESERVE_DISCOUNT_SUCCESS](
      state = reserveDiscountDeleteInitialState,
      action: models.DeleteSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
    /** => failed */
    [types.DELETE_RESERVE_DISCOUNT_FAILED](
      state = reserveDiscountDeleteInitialState,
      action: models.DeleteFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.DELETE_RESERVE_DISCOUNT_RESET]() {
      return reserveDiscountDeleteInitialState;
    },
  },
);
