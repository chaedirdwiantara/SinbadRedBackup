import * as models from '@models';
import * as types from '@types';

/** === ACTIONS === */
/** => PROCESS */
export const getTotalCartProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DetailProcessAction, 'payload'> => {
  contextDispatch({ type: types.GET_TOTAL_CART_PROCESS });
  return {
    type: types.GET_TOTAL_CART_PROCESS,
    contextDispatch,
  };
};

/** => SUCCESS */
export const getTotalCartSuccess = (
  payload: models.DetailSuccessProps<models.GetTotalCart>,
): models.DetailSuccessAction<models.GetTotalCart> => {
  return {
    type: types.GET_TOTAL_CART_SUCCESS,
    payload,
  };
};

/** => FAILED */
export const getTotalCartFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return {
    type: types.GET_TOTAL_CART_FAILED,
    payload,
  };
};

/** RESET */
export const getTotalCartReset = (
  contextDispatch: (action: any) => any,
): { type: string } => {
  contextDispatch({ type: types.GET_TOTAL_CART_RESET });
  return {
    type: types.GET_TOTAL_CART_RESET,
  };
};
