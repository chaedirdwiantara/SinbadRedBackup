import {
  CheckProductResponse,
  CheckStockResponse,
  CheckSellerResponse,
  CartMaster,
} from '.';
/**
 * CART
 */

export interface Cart<T> {
  sellerId: number;
  sellerName: string;
  products: T[];
}

export interface ProductPriceRules {
  minQty: number;
  priceBeforeTax: number;
  priceAfterTax: number;
  taxPrice: number;
}

export interface CartProduct {
  productId: string;
  warehouseId: number;
  categoryId: string;
  productName: string;
  productImageUrl: string;
  qty: number;
  minQty: number;
  qtyPerBox: number;
  uomLabel: string;
  taxPercentage: number;
  selected: boolean;
  lastUsedPrice: number;
  isLastPriceUsedRules: boolean;
  priceAfterTax: number;
  priceBeforeTax: number;
  taxPrice: number;
  priceRules: ProductPriceRules[];
}

export interface CartValidation {
  checkProductData: CheckProductResponse[];
  checkSellerData: CheckSellerResponse[];
  checkStockData: CheckStockResponse[];
  cartData: CartMaster;
}

export interface UpdateCartQty {
  productId: string;
  sellerId: number;
  warehouseId: number;
  type: 'increase' | 'decrease' | 'onChange' | 'onBlur';
  newQty?: number;
}

export interface updateCartQtyBlur {
  qty: number;
  minQty: number;
}

export interface ProductKeyObject {
  productId: string;
  sellerId: number;
  warehouseId: number;
}

export interface ManageCheckbox {
  sellerId: number | null;
  currentStatus?: 'selected' | 'unselect' | 'indeterminate';
}

export interface MergeCheckData {
  checkProductData: CheckProductResponse[];
  checkSellerData: CheckSellerResponse[];
  checkStockData: CheckStockResponse[];
}
