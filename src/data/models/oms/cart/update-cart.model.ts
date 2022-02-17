/**
 * UPDATE CART
 */
import { Cart, CartProduct } from '.';

export interface UpdateCartDataProducts extends CartProduct {
  lastUsedPrice: number;
  isLastPriceUsedRules: boolean;
}

export interface UpdateCartData extends Cart<UpdateCartDataProducts> {}

export interface UpdateCartPayload {
  id: string;
  carts: UpdateCartData[];
}

export interface UpdateCartResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
