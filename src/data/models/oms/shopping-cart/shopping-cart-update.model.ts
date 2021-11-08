export interface ProductItem {
  productId: string;
  qty: number;
  selected: boolean;
}

export interface VoucherItem {
  type: string;
  voucherId: number;
}

export interface CartUpdateProps {
  cartId: string;
  storeId: number;
  products: ProductItem[];
  voucherIds: VoucherItem[];
}
