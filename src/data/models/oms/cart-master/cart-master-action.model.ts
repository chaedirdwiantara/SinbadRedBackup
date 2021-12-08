import * as models from '@models';
/** => update cart selected payload */
export interface UpdateCartMaster {
  type: string;
  payload: models.ICartMaster;
}
/** => delete cart product */
export interface DeleteCartProduct {
  type: string;
  payload: models.ICartDeleteProductPayload;
}
/** => delete cart product */
export interface UpdateCartMasterData {
  type: string;
  payload: models.CartInvoiceGroup[];
}
