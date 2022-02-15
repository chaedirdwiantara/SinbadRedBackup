/**
 * CHECKOUT
 */

import { CartData, CartProductData } from '.';

export interface CheckoutProductData extends CartProductData {}

export interface CheckoutCartData extends CartData<CheckoutProductData> {}

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
