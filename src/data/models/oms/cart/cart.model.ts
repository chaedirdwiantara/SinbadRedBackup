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
  maxQty: number;
  price: number;
}

export interface CartProduct {
  productId: string;
  warehouseId: number;
  warehouseName: string;
  categoryId: string;
  productImageUrl: string;
  brandId: string;
  brandName: string;
  productName: string;
  qty: number;
  multipleQty: number;
  minQty: number;
  qtyPerBox: number;
  uomLabel: string;
  isPriceAfterTax: boolean;
  taxPercentage: number;
  price: number;
  selected: boolean;
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
  type: 'increase' | 'decrease' | 'onChange';
  newQty?: number;
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
