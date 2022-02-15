import { PriceRules, GetCartDataSellersProducts, GetCartData } from '.';

/**
 * CART MASTER
 */
export interface CartMasterPriceRules extends PriceRules {}
export interface CartMaster {
  id: string;
  userId: number;
  buyerId: number;
  totalProducts: number;
  sellers: CartMasterSellers[];
  unavailable: CartMasterUnavailable[];
}
export interface CartMasterSellers {
  sellerId: number;
  sellerName: string;
  products: CartMasterSellersProducts[];
}
export interface CartMasterUnavailable extends CartMasterSellersProducts {
  status: string | null;
  sellerId: number | null;
}
export interface CartMasterSellersProducts extends GetCartDataSellersProducts {}
export interface SetCartMaster extends GetCartData {}
export interface SetCartMasterAction {
  type: string;
  payload: SetCartMaster;
}
