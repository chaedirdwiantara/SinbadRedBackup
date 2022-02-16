/**
 * CHECKOUT
 */

import { CheckoutCart, CheckoutCartProduct } from '.';

export interface CheckoutProductData extends CheckoutCartProduct {}

export interface CheckoutCartData extends CheckoutCart<CheckoutProductData> {}

export interface CheckoutPayload {
  buyerAddress: string;
  carts: CheckoutCartData[];
}

export interface CheckoutResponse {
  id: string;
  userId: number;
  buyerId: number;
  buyerAddress: string;
  sellers: CheckoutCartData[];
}
