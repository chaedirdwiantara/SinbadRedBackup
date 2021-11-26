export interface ProductItem {
  productId: string;
  qty: number;
  selected: boolean;
}

export interface CartUpdatePayload {
  action: string;
  products: ProductItem[];
}
