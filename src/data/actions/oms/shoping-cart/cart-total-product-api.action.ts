/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const cartTotalProductProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DetailProcessAction, 'payload'> => {
  contextDispatch({ type: types.CART_TOTAL_PRODUCT_PROCESS });
  return {
    type: types.CART_TOTAL_PRODUCT_PROCESS,
    contextDispatch,
  };
};
/** => Success */
export const cartTotalProductSuccess = (
  payload: models.DetailSuccessProps<models.CartTotalProductSuccess>,
): models.DetailSuccessAction<models.CartTotalProductSuccess> => {
  return { type: types.CART_TOTAL_PRODUCT_SUCCESS, payload };
};
/** => Failed */
export const cartTotalProductFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.CART_TOTAL_PRODUCT_FAILED, payload };
};
/** => Reset */
export const cartTotalProductReset = () => {
  return { type: types.CART_TOTAL_PRODUCT_RESET };
};
