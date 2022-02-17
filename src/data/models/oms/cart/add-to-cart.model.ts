import { CartProduct } from '.';

/**
 * ADD TO CART
 */
export interface AddToCartPayload extends CartProduct {
  sellerId: number;
  sellerName: string;
}
export interface AddToCartResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
