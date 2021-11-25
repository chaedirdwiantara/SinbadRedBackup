import * as types from '@types';
import * as models from '@models';

/** === HISTORY PAYMENT DETAIL === */
/** => payment detail process */
export const historyPaymentDetailProcess = (
    contextDispatch: (action: any) => any,
    data: models.DetailProcessProps,
  ): models.DetailProcessAction => {
    contextDispatch({ type: types.HISTORY_PAYMENT_DETAIL_PROCESS, payload: data });
    return {
      type: types.HISTORY_PAYMENT_DETAIL_PROCESS,
      payload: data,
      contextDispatch,
    };
  };
  /** => banner detail success */
  export const historyPaymentDetailSuccess = (
    data: models.DetailSuccessProps<models.PaymentDetailSuccessProps>,
  ): models.DetailSuccessAction<models.PaymentDetailSuccessProps> => {
    return { type: types.HISTORY_PAYMENT_DETAIL_SUCCESS, payload: data };
  };
  /** => banner detail failed */
  export const historyPaymentDetailFailed = (
    data: models.ErrorProps,
  ): models.DetailFailedAction => {
    return { type: types.HISTORY_PAYMENT_DETAIL_FAILED, payload: data };
  };