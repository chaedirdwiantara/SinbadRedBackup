import * as types from '@types';
import * as models from '@models';
/** => For Update data product master cart */
export const updateDataProductMasterCart = (
  payload: Array<models.IProductItemUpdateCart>,
): models.UpdateDataProductMasterCart => {
  return { type: types.UPDATE_PRODUCT_MASTER_CART, payload };
};
/** => Update item product master cart  */
export const updateItemProductMasterCart = (
  payload: models.IProductItemUpdateCart,
): models.UpdateItemProductMasterCart => {
  return { type: types.UPDATE_ITEM_PRODUCT_MASTER_CART, payload };
};
/** => Delete item product master cart  */
export const deleteItemProductMasterCart = (
  payload: models.ICartDeleteProductPayload,
): models.DeleteItemProductMasterCart => {
  return { type: types.DELETE_ITEM_PRODUCT_MASTER_CART, payload };
};
