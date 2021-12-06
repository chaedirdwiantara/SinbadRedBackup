export interface IProductItemUpdateCart {
  productId: string;
  qty: number;
  selected: boolean;
  stock: number;
}

export interface CartUpdatePayload {
  action: string;
  products: IProductItemUpdateCart[];
}
