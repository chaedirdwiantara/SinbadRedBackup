import * as types from '@types';
import * as models from '@models';
/** === CHANEG FLAG RTDB === */

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

export const isOrderRTDBChangeSuccess = (
  data: models.PaymentMethodOrderRTDB,
): models.isOrderRTDBChangeAction => {
  return { type: types.PAYMENT_METHOD_SUB_RTDB_SUCCESS, payload: data };
};

export const isOrderRTDBChangeFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_METHOD_SUB_RTDB_FAILED, payload: data };
};
