/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentTypesListInitialProps = models.ListItemProps<
  models.IPaymentTypesList[]
>;
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
export const paymentTypesListReducer = simplifyReducer(
  paymentTypesListInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.PAYMENT_TYPES_LIST_PROCESS](
      state = paymentTypesListInitialState,
      { payload }: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.PAYMENT_TYPES_LIST_SUCCESS](
      state = paymentTypesListInitialState,
      { payload }: models.ListSuccessAction<models.IPaymentTypeListSuccess>,
    ) {
      return {
        ...state,
        data: [...payload.data.paymentTypes],
        loading: false,
      };
    },
    /** => list failed */
    [types.PAYMENT_TYPES_LIST_FAILED](
      state = paymentTypesListInitialState,
      { payload }: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
  },
);
