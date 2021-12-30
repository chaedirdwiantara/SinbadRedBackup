import * as models from '@models';

export interface IProductMaster {
  data: Array<models.IProductItemUpdateCart>;
}

export interface IUpdateSelectedProductPayload {
  productId: string;
  selected: boolean;
}
