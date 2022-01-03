export interface IProductItemUpdateCart {
  productId: string;
  qty: number;
  selected: boolean;
  stock: number;
}

export interface IProductRemoveSelected extends IProductItemUpdateCart {
  type: 'data' | 'dataEmptyStock' | 'dataNotFound';
}

export interface CartUpdatePayload {
  action: string;
  products: IProductItemUpdateCart[];
}
