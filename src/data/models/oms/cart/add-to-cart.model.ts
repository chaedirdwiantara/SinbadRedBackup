import { GetCartDataSellersProducts } from '.';

/**
 * ADD TO CART
 */
export interface AddToCartPayload extends GetCartDataSellersProducts {
  sellerId: number;
  sellerName: string;
}
export interface AddToCartResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
