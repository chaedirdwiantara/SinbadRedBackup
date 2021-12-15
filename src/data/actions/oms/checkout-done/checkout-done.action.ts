import * as types from '@types';
import * as models from '@models';
import { GET_ORDER_DETAIL_PROCESS } from '@types';
/** GET ORDER DETAIL */
/** => Process */
export const getOrdersDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: GET_ORDER_DETAIL_PROCESS,
    payload,
  });
  return {
    type: types.GET_ORDER_DETAIL_PROCESS,
    payload: payload,
    contextDispatch,
  };
};
/** Success */
export const getOrdersDetailSuccess = (
  payload: models.DetailSuccessProps<models.CheckoutDoneOrders>,
): models.DetailSuccessAction<models.CheckoutDoneOrders> => {
  return { type: types.GET_ORDER_DETAIL_SUCCESS, payload };
};
/** Failed */
export const getOrdersDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.GET_ORDER_DETAIL_FAILED, payload };
};
/** Reset */
export const getOrdersDetailReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.GET_ORDER_DETAIL_RESET });
  return { type: types.GET_ORDER_DETAIL_RESET };
};
