/**
 * ADD TO CART
 */
export interface AddToCartPayload {
  productId: string;
  productName: string;
  brandId: string;
  brandName: string;
  productImageUrl: string;
  minQty: number;
  qty: number;
  isPriceAfterTax: boolean;
  taxPercentage: number;
  price: number;
  uomLabel: string;
  warehouseId: number;
  sellerId: number;
  sellerName: string;
}
export interface AddToCartResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
}
