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
/** => update previous route name */
export interface UpdateRouteNameMasterCart {
  type: string;
  payload: models.IUpdateRouteNamePayload;
}
/** => delete cart product empty stock */
export interface DeleteCartProductEmptyStock {
  type: string;
  payload: models.ICartDeleteProductPayload;
}
/** => delete cart product not found */
export interface DeleteCartProductNotFound {
  type: string;
  payload: models.ICartDeleteProductPayload;
}
