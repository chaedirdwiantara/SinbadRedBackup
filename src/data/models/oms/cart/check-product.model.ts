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

export interface CheckProductResponse
  extends Omit<
    CartProduct,
    'qty, warehouseName, lastUsedPrice, isLastPriceUsedRules, selected'
  > {
  externalProductCode: string;
  sellerId: number;
  sellerName: string;
  status: string;
  brandId: string;
  brandName: string;
  categoryName: string;
}
