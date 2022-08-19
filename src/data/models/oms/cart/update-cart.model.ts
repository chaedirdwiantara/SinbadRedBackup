/**
 * UPDATE CART
 */
import { Cart, CartProduct } from '.';

export interface UpdateCartDataProducts extends CartProduct {}

export interface UpdateCartData extends Cart<UpdateCartDataProducts> {}

export interface UpdateCartPayload {
  id: string;
  carts: UpdateCartData[];
  buyerName: string;
}

export interface UpdateCartResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
