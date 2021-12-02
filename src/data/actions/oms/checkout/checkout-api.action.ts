/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const getCheckoutProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DetailProcessAction, 'payload'> => {
  contextDispatch({ type: types.GET_CHECKOUT_PROCESS });
  return {
    type: types.GET_CHECKOUT_PROCESS,
    contextDispatch,
  };
};
/** => Success */
export const getCheckoutSuccess = (
  payload: models.DetailSuccessProps<models.CheckoutSuccess>,
): models.DetailSuccessAction<models.CheckoutSuccess> => {
  return { type: types.GET_CHECKOUT_SUCCESS, payload };
};
/** => Failed */
export const getCheckoutFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.GET_CHECKOUT_FAILED, payload };
};
/** => Reset */
export const getCheckoutReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({
    type: types.GET_CHECKOUT_RESET,
  });
  return { type: types.GET_CHECKOUT_RESET };
};
