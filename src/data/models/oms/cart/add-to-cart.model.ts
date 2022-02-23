import { CartProduct } from '.';

/**
 * ADD TO CART
 */
export interface AddToCartPayload extends CartProduct {
  sellerId: number;
  sellerName: string;
  lastUsedPrice: number;
  isPriceUsedRules: boolean;
  taxPercentage: number;
  leadTime: number;
}
export interface AddToCartResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
