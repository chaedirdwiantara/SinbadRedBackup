/**
 * GET CART
 */
export interface GetCart {
  data: GetCartData;
}
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
  brandId: number;
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
}
