import {
  ProductPriceRules,
  GetCartData,
  CheckProductResponse,
  CartProduct,
  CheckSellerResponse,
  CheckStockResponse,
} from '.';

/**
 * CART MASTER
 */
export interface CartMasterPriceRules extends ProductPriceRules {}
export interface CartMaster {
  id: string;
  userId: number;
  buyerId: number;
  totalProducts: number;
  sellers: CartMasterSellers[];
  unavailable: CartMasterUnavailable[];
  isCheckProductMerged: boolean;
  isCheckSellerMerged: boolean;
  isCheckStockMerged: boolean;
}
export interface CartMasterSellers {
  sellerId: number;
  sellerName: string;
  products: CartMasterSellersProducts[];
}
export interface CartMasterUnavailable extends CartMasterSellersProducts {
  status: string;
}
export interface CartMasterSellersProducts extends CartProduct {
  sellerId: number;
  sellerName: string;
  lastUsedPrice?: number;
  isLastPriceUsedRules?: boolean;
}
export interface SetCartMaster extends GetCartData {}
export interface SetCartMasterAction {
  type: string;
  payload: SetCartMaster;
}
export interface MergeCheckProductAction {
  type: string;
  payload: CheckProductResponse[];
}
export interface MergeCheckSellerAction {
  type: string;
  payload: CheckSellerResponse[];
}
export interface MergeCheckStockAction {
  type: string;
  payload: CheckStockResponse[];
}
