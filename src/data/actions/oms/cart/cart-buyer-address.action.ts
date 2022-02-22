/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => PROCESS */
export const cartBuyerAddressProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DetailProcessAction, 'payload'> => {
  contextDispatch({ type: types.CART_BUYER_ADDRESS_PROCESS });
  return {
    type: types.CART_BUYER_ADDRESS_PROCESS,
    contextDispatch,
  };
};
/** => SUCCESS */
export const cartBuyerAddressSuccess = (
  payload: models.DetailSuccessProps<models.CartBuyerAddress>,
): models.DetailSuccessAction<models.CartBuyerAddress> => {
  return { type: types.CART_BUYER_ADDRESS_SUCCESS, payload };
};
/** => FAILED */
export const cartBuyerAddressFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.CART_BUYER_ADDRESS_FAILED, payload };
};
/** => RESET */
export const cartBuyerAddressReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.CART_BUYER_ADDRESS_RESET });
  return { type: types.CART_BUYER_ADDRESS_RESET };
};
