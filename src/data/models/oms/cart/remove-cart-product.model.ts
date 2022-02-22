/**
 * REMOVE CART PRODUCT
 */
export interface RemoveCartProductPayload {
  cartId: string;
  removedProducts: RemovedProducts[];
}
export interface RemoveCartProductResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface RemovedProducts {
  productId: string;
  warehouseId: number;
}

export interface HandleRemoveProduct {
  removedProducts: RemovedProducts[];
  source: 'available' | 'unavailable';
}
