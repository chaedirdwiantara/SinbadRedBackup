import * as types from '@types';
import * as models from '@models';
/** => Update Cart Selected */
export const updateCartMaster = (
  payload: models.ICartMaster,
): models.UpdateCartMaster => {
  return { type: types.UPDATE_CART_MASTER, payload };
};
/** => Delete Cart Selected  */
export const deleteCartProduct = (
  payload: models.ICartDeleteProductPayload,
): models.DeleteCartProduct => {
  return { type: types.DELETE_CART_PRODUCT, payload };
};
/** => Update Cart Master Data  */
export const updateCartMasterData = (
  payload: models.CartInvoiceGroup[],
): models.UpdateCartMasterData => {
  return { type: types.UPDATE_CART_MASTER_DATA, payload };
};
/** => reset checkout master data */
export const resetCartMasterData = () => {
  return { type: types.RESET_CART_MASTER_DATA };
};
