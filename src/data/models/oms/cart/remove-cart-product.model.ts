/**
 * REMOVE CART PRODUCT
 */
export interface RemoveCartProductPayload {
  cartId: string;
  productIds: string[];
}
export interface RemoveCartProductResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
