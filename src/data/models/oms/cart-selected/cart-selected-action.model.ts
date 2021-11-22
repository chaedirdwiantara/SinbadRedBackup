import * as models from '@models';
/** => update cart selected payload */
export interface UpdateCartSelected {
  type: string;
  payload: models.CartSelected;
}
