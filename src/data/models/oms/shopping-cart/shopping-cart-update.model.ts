export interface ProductItem {
  productId: string;
  qty: number;
  selected: boolean;
}

export interface VoucherItem {
  type: string;
  voucherId: number;
}

export interface CartUpdatePayload {
  action: string;
  cartId: string;
  products: ProductItem[];
  voucherIds: VoucherItem[];
}
