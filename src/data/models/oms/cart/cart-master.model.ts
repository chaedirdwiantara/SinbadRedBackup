import { ProductPriceRules, CartProduct } from '.';

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
}
export interface CartMasterSellers {
  sellerId: number;
  sellerName: string;
  sellerAdminId?: number;
  sellerAdminName?: string;
  sellerAdminEmail?: string;
  products: CartMasterSellersProducts[];
  status?: string;
}
export interface CartMasterUnavailable extends CartMasterSellersProducts {
  unavailableMessage: string;
}
export interface CartMasterSellersProducts extends CartProduct {
  sellerId?: number;
  sellerName?: string;
  stock?: number;
  productStatus?: string;
  isStockAvailable?: boolean;
  leadTime?: number;
  externalProductCode?: string;
  externalWarehouseCode?: string;
  warehouseName?: string;
  brandId?: number;
  brandName?: string;
}
