import * as types from '@types';
import * as models from '@models';
/** === CHANEG FLAG RTDB === */

/** === ACTION === */
/** => PROCESS */
export const isOrderRTDBChangeProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({
    type: types.PAYMENT_METHOD_SUB_RTDB_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_METHOD_SUB_RTDB_PROCESS,
    payload: data,
    contextDispatch,
  };
};

/** => SUCCESS */
export const isOrderRTDBChangeSuccess = (
  data: models.PaymentMethodOrderRTDB,
): models.isOrderRTDBChangeAction => {
  return { type: types.PAYMENT_METHOD_SUB_RTDB_SUCCESS, payload: data };
};
/** => FAILED */
export const isOrderRTDBChangeFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_METHOD_SUB_RTDB_FAILED, payload: data };
};
/** => RESET */
export const isOrderRTDBChangeReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.PAYMENT_METHOD_SUB_RTDB_RESET });
  return { type: types.PAYMENT_METHOD_SUB_RTDB_RESET };
};
