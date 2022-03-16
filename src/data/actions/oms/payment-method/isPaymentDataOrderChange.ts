import * as types from '@types';
import * as models from '@models';
/** === CHANEG FLAG RTDB === */
// export const isPaymentDataRTDBChange = (
//   data: models.FlagRTDBData,
// ): models.isFlagRTDBChangeAction => {
//   return { type: types.CHANGE_RTDB_PAYMENT_ORDER, payload: data };
// };

export const CHANGE_RTDB_PAYMENT_ORDER = 'CHANGE_RTDB_PAYMENT_ORDER';

export const dispatchOrderLoading = (dispatch: any) => {
  return dispatch({
    type: CHANGE_RTDB_PAYMENT_ORDER,
    payload: {
      loading: true,
      data: false,
      errorMessage: false,
    },
  });
};

export const dispatchOrderSuccess = (dispatch: any, result: boolean) => {
  return dispatch({
    type: CHANGE_RTDB_PAYMENT_ORDER,
    payload: {
      loading: false,
      data: result,
      errorMessage: false,
    },
  });
};
