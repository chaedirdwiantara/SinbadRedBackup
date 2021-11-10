import * as types from '@types';
import * as models from '@models';
/** => For Update Verification Cart */
export const verificationCart = (
  data: models.CartSuccessProps,
): models.UpdateVerificationCart => {
  return { type: types.UPDATE_VERIFICATION_CART, payload: data };
};
