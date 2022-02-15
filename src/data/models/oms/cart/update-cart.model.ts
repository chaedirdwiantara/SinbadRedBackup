import { GetCartDataSellersProducts } from '.';

/**
 * UPDATE CART
 */
export interface UpdateCartDataProducts extends GetCartDataSellersProducts {}

export interface UpdateCartData {
  sellerId: number;
  sellerName: string;
  products: UpdateCartDataProducts[];
}

export interface UpdateCartPayload {
  carts: UpdateCartData[];
}

export interface UpdateCartResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
