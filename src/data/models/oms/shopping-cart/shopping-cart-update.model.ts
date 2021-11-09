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
  cartId: string;
  storeId: number;
  products: ProductItem[];
  voucherIds: VoucherItem[];
}
