import * as types from '@types';
import * as models from '@models';

/** === HISTORY PAYMENT DETAIL === */
/** => payment detail process */
export const historyPaymentDetailProcess = (
    contextDispatch: (action: any) => any,
    payload: models.DetailProcessProps,
  ): models.DetailProcessAction => {
    contextDispatch({ type: types.HISTORY_PAYMENT_DETAIL_PROCESS, payload });
    return {
      type: types.HISTORY_PAYMENT_DETAIL_PROCESS,
      payload,
      contextDispatch,
    };
  };
  /** => banner detail success */
  export const historyPaymentDetailSuccess = (
    payload: models.DetailSuccessProps<models.PaymentDetailSuccessProps>,
  ): models.DetailSuccessAction<models.PaymentDetailSuccessProps> => {
    return { type: types.HISTORY_PAYMENT_DETAIL_SUCCESS, payload };
  };
  /** => banner detail failed */
  export const historyPaymentDetailFailed = (
    payload: models.ErrorProps,
  ): models.DetailFailedAction => {
    return { type: types.HISTORY_PAYMENT_DETAIL_FAILED, payload };
  };