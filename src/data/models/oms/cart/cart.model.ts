import {
  CheckProductResponse,
  CheckStockResponse,
  CheckSellerResponse,
  CartMasterUnavailable,
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
