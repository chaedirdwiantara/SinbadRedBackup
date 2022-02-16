/**
 * CHECK PRODUCT
 */

export interface CheckProductPayload {
  carts: CheckProductPayloadCarts[];
}

export interface CheckProductPayloadCarts {
  productId: string;
  warehouseId: number;
}
