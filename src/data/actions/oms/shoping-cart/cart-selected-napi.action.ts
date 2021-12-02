import * as types from '@types';
import * as models from '@models';
/** => For Update Cart Selected */
export const updateCartSelected = (
  data: models.CartSelected,
): models.UpdateCartSelected => {
  return { type: types.UPDATE_CART_SELECTED, payload: data };
};
