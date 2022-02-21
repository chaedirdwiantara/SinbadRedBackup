import { CartProduct } from '.';
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

export interface CheckProductResponse extends CartProduct {
  sellerId: number;
  sellerName: string;
  status: string;
}
