/**
 * CHECK SINBAD VOUCHER
 */
export interface CheckSinbadVoucherResponse {
  isVoucherExist: boolean;
  sinbadVoucherId: number;
  totalOrder: number;
  sinbadVoucherDiscountOrder: number;
  totalOrderAfterSinbadVoucher: number;
  carts: CheckSinbadVoucherResponseCarts[];
}

export interface CheckSinbadVoucherResponseCarts {
  sellerId: number;
  totalOrderSeller: number;
  sinbadVoucherDiscountParcel: number;
}

export interface CheckSinbadVoucherPayload {
  cartId: string;
  sinbadVoucherId: number | null;
  reserved: boolean;
  carts: CheckSinbadVoucherPayloadCarts[];
}

export interface CheckSinbadVoucherPayloadCarts {
  sellerId: number;
  products: CheckSinbadVoucherPayloadProducts[];
}

export interface CheckSinbadVoucherPayloadProducts {
  productId: string;
  qty: number;
  priceAfterTax: number;
}
