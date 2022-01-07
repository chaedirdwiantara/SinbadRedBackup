import * as models from '@models';
/** => update item product master cart */
export interface UpdateItemProductMasterCart {
  type: string;
  payload: models.IProductItemUpdateCart;
}
/** => update data product master cart */
export interface UpdateDataProductMasterCart {
  type: string;
  payload: Array<models.IProductItemUpdateCart>;
}
/** => delete item product master cart */
export interface DeleteItemProductMasterCart {
  type: string;
  payload: models.ICartDeleteProductPayload;
}
/** => update item selected product master cart */
export interface UpdateItemSelectedProductMasterCart {
  type: string;
  payload: models.IUpdateSelectedProductPayload;
}
