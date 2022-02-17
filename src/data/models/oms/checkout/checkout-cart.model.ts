/**
 * CHECKOUT
 */

import { CheckoutCart, CheckoutCartProduct } from '.';

export interface CheckoutProductData extends CheckoutCartProduct {
  lastUsedPrice: number;
  isLastPriceUsedRules: boolean;
}

export interface CheckoutCartPayload
  extends CheckoutCart<CheckoutProductData> {}

export interface CheckoutPayload {
  buyerAddress: string;
  carts: CheckoutCartPayload[];
}

export interface CheckoutCartResponse
  extends CheckoutCart<
    Omit<CheckoutProductData, 'lastUsedPrice' | 'isLastPriceUsedRules'>
  > {}

export interface CheckoutResponse {
  id: string;
  userId: number;
  buyerId: number;
  buyerAddress: string;
  sellers: CheckoutCartResponse[];
}
