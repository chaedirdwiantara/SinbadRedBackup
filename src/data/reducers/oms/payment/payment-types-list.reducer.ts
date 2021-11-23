/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type PaymentTypesListInitialProps = models.ListItemProps<models.IPaymentTypesList[]>;
/** === INITIAL STATE HERE === */
export const paymentTypesListInitialState: PaymentTypesListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const paymentTypesListReducer = simplifyReducer(paymentTypesListInitialState, {
  /** ===> LIST */
  /** => list process */
  [types.PAYMENT_TYPES_LIST_PROCESS](
    state = paymentTypesListInitialState,
    action: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: action.payload.loading,
      error: null,
    };
  },
  /** => list success */
  [types.PAYMENT_TYPES_LIST_SUCCESS](
    state = paymentTypesListInitialState,
    action: models.ListSuccessAction<models.IPaymentTypesList[]>,
  ) {
    return {
      ...state,
      data: [...action.payload.data?.paymentTypes],
      loading: false,
    };
  },
  /** => list failed */
  [types.PAYMENT_TYPES_LIST_FAILED](
    state = paymentTypesListInitialState,
    action: models.ListFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
});
