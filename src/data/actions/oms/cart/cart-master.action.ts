import * as types from '@types';
import * as models from '@models';
/** => SET CART MASTER DATA AFTER FETCH */
export const setCartMaster = (
  payload: models.SetCartMaster,
): models.SetCartMasterAction => {
  return { type: types.SET_CART_MASTER, payload };
};
/** => MERGE CHECK PRODUCT DATA AFTER FETCH */
export const mergeCheckProduct = (
  payload: models.CheckProductResponse[],
): models.MergeCheckProductAction => {
  return { type: types.MERGE_CHECK_PRODUCT, payload };
};
/** => MERGE CHECK SELLER DATA AFTER FETCH */
export const mergeCheckSeller = (
  payload: models.CheckSellerResponse[],
): models.MergeCheckSellerAction => {
  return { type: types.MERGE_CHECK_SELLER, payload };
};
/** => MERGE CHECK STOCK DATA AFTER FETCH */
export const mergeCheckStock = (
  payload: models.CheckStockResponse[],
): models.MergeCheckStockAction => {
  return { type: types.MERGE_CHECK_STOCK, payload };
};
/** => CART MASTER REMOVE PRODUCT */
export const CartMasterRemoveProduct = (
  payload: models.HandleRemoveProduct,
): models.CartMasterRemoveProductAction => {
  return { type: types.CART_MASTER_REMOVE_PRODUCT, payload };
};
/** => RESET CART MASTER DATA TO INITIAL STATE */
export const resetCartMaster = () => {
  return { type: types.RESET_CART_MASTER };
};
