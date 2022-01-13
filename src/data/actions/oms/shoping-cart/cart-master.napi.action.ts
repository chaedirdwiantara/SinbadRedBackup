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
/** => Delete Cart Selected  */
export const updatePreviouseRouteCart = (
  payload: models.IUpdateRouteNamePayload,
): models.UpdateRouteNameMasterCart => {
  return { type: types.UPDATE_ROUTE_MASTER_DATA, payload };
};
/** => reset checkout master data */
export const resetCartMasterData = () => {
  return { type: types.RESET_CART_MASTER_DATA };
};
/** => Delete Cart Product empty stock */
export const deleteCartProductEmptyStock = (
  payload: models.ICartDeleteProductPayload,
): models.DeleteCartProductEmptyStock => {
  return { type: types.DELETE_CART_PRODUCT_EMPTY_STOCK, payload };
};
/** => Delete Cart product not found */
export const deleteCartProductNotFound = (
  payload: models.ICartDeleteProductPayload,
): models.DeleteCartProductNotFound => {
  return { type: types.DELETE_CART_PRODUCT_NOT_FOUND, payload };
};
