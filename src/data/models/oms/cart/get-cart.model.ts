/**
 * GET CART
 */
export interface GetCartData {
  id: string;
  userId: number;
  buyerId: number;
  totalProducts: number;
  sellers: GetCartDataSellers[];
}
export interface GetCartDataSellers {
  sellerId: number;
  sellerName: string;
  products: GetCartDataSellersProducts[];
}
export interface GetCartDataSellersProducts {
  productId: string;
  warehouseId: number;
  categoryId: string;
  brandId: string;
  brandName: string;
  productName: string;
  qty: number;
  minQty: number;
  qtyPerBox: number;
  uomLabel: string;
  isPriceAfterTax: boolean;
  taxPercentage: number;
  lastUsedPrice: number;
  price: number;
  priceRules: PriceRules[];
  selected: boolean;
}
export interface PriceRules {
  minQty: number;
  maxQty: number;
  price: number;
}
