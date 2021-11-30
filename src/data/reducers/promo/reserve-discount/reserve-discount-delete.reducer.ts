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
    /** ===> DETAIL */
    /** => detail process */
    [types.DELETE_RESERVE_DISCOUNT_PROCESS]() {
      return {
        ...reserveDiscountDeleteInitialState,
        loading: true,
      };
    },
    /** => detail success */
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
    /** => detail failed */
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
    /** => detail reset */
    [types.DELETE_RESERVE_DISCOUNT_RESET]() {
      return reserveDiscountDeleteInitialState;
    },
  },
);
