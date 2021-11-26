/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ReserveDiscountCreateInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const reserveDiscountCreateInitialState: ReserveDiscountCreateInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const reserveDiscountCreateReducer = simplifyReducer(
  reserveDiscountCreateInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.CREATE_RESERVE_DISCOUNT_PROCESS]() {
      return {
        ...reserveDiscountCreateInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.CREATE_RESERVE_DISCOUNT_SUCCESS](
      state = reserveDiscountCreateInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.CREATE_RESERVE_DISCOUNT_FAILED](
      state = reserveDiscountCreateInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
);
