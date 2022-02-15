/**
 * UPDATE CART
 */
import { CartData, CartProductData } from '.';

export interface UpdateCartDataProducts extends CartProductData {}

export interface UpdateCartData extends CartData<UpdateCartDataProducts> {}

export interface UpdateCartPayload {
  carts: UpdateCartData[];
}

export interface UpdateCartResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
