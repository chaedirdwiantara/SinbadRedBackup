import * as types from '@types';
import * as models from '@models';
/** => For Update Verification Cart */
export const verificationCart = (
  data: models.CartSelected,
): models.UpdateVerificationCart => {
  return { type: types.UPDATE_CART_SELECTED, payload: data };
};
