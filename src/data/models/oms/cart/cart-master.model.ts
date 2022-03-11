import { ProductPriceRules, CartProduct } from '.';

/**
 * CART MASTER
 */
export interface CartMasterPriceRules extends ProductPriceRules {}
export interface CartMaster {
  id: string;
  userId: number;
  buyerId: number;
  buyerName: string;
  totalProducts: number;
  sellers: CartMasterSellers[];
  unavailable: CartMasterUnavailable[];
}
export interface CartMasterSellers {
  sellerId: number;
  sellerName: string;
  products: CartMasterSellersProducts[];
  status?: string;
}
export interface CartMasterUnavailable extends CartMasterSellersProducts {
  unavailableMessage: string;
}
export interface CartMasterSellersProducts extends CartProduct {
  sellerId?: number;
  sellerName?: string;
  lastUsedPrice: number;
  isLastPriceUsedRules: boolean;
  stock?: number;
  productStatus?: string;
  stockStatus?: string;
  leadTime?: number;
}
