/**
 * CHECKOUT
 */

export interface CheckoutCart<T> {
  sellerId: number;
  sellerName: string;
  products: T[];
}

export interface CheckoutProductPriceRules {
  minQty: number;
  maxQty: number;
  price: number;
}

export interface CheckoutCartProduct {
  productId: string;
  warehouseId: number;
  categoryId: string;
  productImageUrl: string;
  brandId: string;
  brandName: string;
  productName: string;
  qty: number;
  minQty: number;
  qtyPerBox: number;
  uomLabel: string;
  isPriceAfterTax: boolean;
  taxPercentage: number;
  price: number;
  selected: boolean;
  priceRules: CheckoutProductPriceRules[];
}
