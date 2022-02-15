import * as types from '@types';
import * as models from '@models';
/** => SET CART MASTER DATA AFTER FETCH */
export const setCartMaster = (
  payload: models.SetCartMaster,
): models.SetCartMasterAction => {
  console.log('payload2', payload);
  return { type: types.SET_CART_MASTER, payload };
};
/** => RESET CART MASTER DATA TO INITIAL STATE */
export const resetCartMaster = () => {
  return { type: types.RESET_CART_MASTER };
};
