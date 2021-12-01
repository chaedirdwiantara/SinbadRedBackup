export interface IProductItemUpdateCart {
  productId: string;
  qty: number;
  selected: boolean;
}

export interface CartUpdatePayload {
  action: string;
  products: IProductItemUpdateCart[];
}
