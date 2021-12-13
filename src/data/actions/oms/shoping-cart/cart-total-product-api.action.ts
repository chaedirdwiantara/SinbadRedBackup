/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const cartTotalProductProcess = (): Omit<
  models.DetailProcessAction,
  'payload' | 'contextDispatch'
> => {
  return {
    type: types.CART_TOTAL_PRODUCT_PROCESS,
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
