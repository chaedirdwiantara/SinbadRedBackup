import * as types from '@types';
import * as models from '@models';
/** === CHANEG FLAG RTDB === */

export const isOrderRTDBChange = (
  data: models.PaymentMethodOrderRTDB,
): models.isOrderRTDBChangeAction => {
  return { type: types.PAYMENT_METHOD_SUB_RTDB_SUCCESS, payload: data };
};
