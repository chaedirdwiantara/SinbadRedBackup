/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => PROCESS */
export const checkBuyerProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DetailProcessAction, 'payload'> => {
  contextDispatch({ type: types.CHECK_BUYER_PROCESS });
  return {
    type: types.CHECK_BUYER_PROCESS,
    contextDispatch,
  };
};
/** => SUCCESS */
export const checkBuyerSuccess = (
  payload: models.DetailSuccessProps<models.CheckBuyer>,
): models.DetailSuccessAction<models.CheckBuyer> => {
  return { type: types.CHECK_BUYER_SUCCESS, payload };
};
/** => FAILED */
export const checkBuyerFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.CHECK_BUYER_FAILED, payload };
};
/** => RESET */
export const checkBuyerReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CHECK_BUYER_RESET });
  return { type: types.CHECK_BUYER_RESET };
};
