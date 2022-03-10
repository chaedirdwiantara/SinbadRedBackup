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
  priceRules: CheckoutProductPriceRules;
}

export interface CheckoutData {
  id: string;
  userId: number;
  cartId: string;
  buyerId: number;
  sellers: CheckoutSellers[];
}

export interface CheckoutSellers {
  sellerId: number;
  sellerName: string;
  products: CheckoutProducts[];
}
export interface CheckoutProducts {
  productId: string;
  warehouseId: number;
  warehouseName: string;
  categoryId: string;
  brandId: string;
  brandName: string;
  productName: string;
  productImageUrl: string;
  qty: number;
  minQty: number;
  multipleQty: number;
  qtyPerBox: number;
  uomLabel: string;
  isPriceAfterTax: boolean;
  taxPercentage: number;
  lastUsedPrice: number;
  leadTime: number;
  price: number;
  priceRules: CheckoutPriceRules;
}

export interface CheckoutPriceRules {
  minQty: number;
  maxQty: number;
  price: number;
}
