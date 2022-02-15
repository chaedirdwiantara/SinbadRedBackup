/**
 * CART
 */

export interface CartData<T> {
  sellerId: number;
  sellerName: string;
  products: T[];
}

export interface ProductPriceRules {
  minQty: number;
  maxQty: number;
  price: number;
}

export interface CartProductData {
  productId: string;
  warehouseId: number;
  categoryId?: string;
  productImageUrl?: string;
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
  priceRules?: ProductPriceRules[];
  lastUsedPrice?: number;
}
