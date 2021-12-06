import * as types from '@types';
import * as models from '@models';
/** === CREATE ORDERS === */
/** => Process */
export const createOrdersProcess = (
  contextDispatch: (action: any) => any,
  payload: models.CreateProcessProps<models.CreateOrders>,
): models.CreateProcessAction<models.CreateOrders> => {
  contextDispatch({
    type: types.CREATE_ORDER_PROCESS,
    payload,
  });
  return {
    type: types.CREATE_ORDER_PROCESS,
    payload: payload.data,
    contextDispatch,
  };
};
/** => Success */
export const createOrdersSuccess = (
  payload: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.CREATE_ORDER_SUCCESS, payload };
};
/** => Failed */
export const createOrdersFailed = (
  payload: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CREATE_ORDER_FAILED, payload };
};
