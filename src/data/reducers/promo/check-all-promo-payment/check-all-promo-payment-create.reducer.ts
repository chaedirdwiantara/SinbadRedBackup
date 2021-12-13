/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type CheckAllPromoPaymentCreateInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const checkAllPromoPaymentCreateInitialState: CheckAllPromoPaymentCreateInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const checkAllPromoPaymentCreateReducer = simplifyReducer(
  checkAllPromoPaymentCreateInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.CREATE_CHECK_PROMO_PAYMENT_PROCESS]() {
      return {
        ...checkAllPromoPaymentCreateInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.CREATE_CHECK_PROMO_PAYMENT_SUCCESS](
      state = checkAllPromoPaymentCreateInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.CREATE_CHECK_PROMO_PAYMENT_FAILED](
      state = checkAllPromoPaymentCreateInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => create reset */
    [types.CREATE_CHECK_PROMO_PAYMENT_RESET]() {
      return checkAllPromoPaymentCreateInitialState;
    },
  },
);
