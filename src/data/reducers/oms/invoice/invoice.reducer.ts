/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type InvoiceProps = models.DetailItemProps<models.Invoice>;
/** === INITIAL STATE === */
export const InvoiceInitialState: InvoiceProps = {
  data: null,
  loading: true,
  refresh: false,
  error: null,
};
/** === REDUCER === */
export const InvoiceReducer = simplifyReducer(InvoiceInitialState, {
  /** => Process */
  [types.INVOICE_PROCESS]() {
    return {
      ...InvoiceInitialState,
      loading: true,
    };
  },
  /** => Succeeded */
  [types.INVOICE_SUCCESS](
    state = InvoiceInitialState,
    { payload }: models.DetailSuccessAction<models.Invoice>,
  ) {
    return {
      ...state,
      data: payload?.data,
      loading: false,
      error: null,
      refresh: false,
    };
  },
  /** => Failed */
  [types.INVOICE_FAILED](
    state = InvoiceInitialState,
    { payload }: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  },
  /** => Refresh */
  [types.INVOICE_REFRESH]() {
    return {
      ...InvoiceInitialState,
      refresh: true,
    };
  },
  /** => Reset */
  [types.INVOICE_RESET]() {
    return InvoiceInitialState;
  },
});
