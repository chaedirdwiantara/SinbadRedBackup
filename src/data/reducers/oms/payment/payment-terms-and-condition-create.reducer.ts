/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type PaymentTermsAndConditionCreateInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const paymentTermsAndConditionCreateInitialState: PaymentTermsAndConditionCreateInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const paymentTermsAndConditionCreateReducer = simplifyReducer(
    paymentTermsAndConditionCreateInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.PAYMENT_TERMS_AND_CONDITION_CREATE_PROCESS]() {
      return {
        ...paymentTermsAndConditionCreateInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.PAYMENT_TERMS_AND_CONDITION_CREATE_SUCCESS](
      state = paymentTermsAndConditionCreateInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.PAYMENT_TERMS_AND_CONDITION_CREATE_FAILED](
      state = paymentTermsAndConditionCreateInitialState,
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