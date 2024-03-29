import { Cart, CartProduct } from '.';
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
export interface GetCartDataSellers extends Cart<GetCartDataSellersProducts> {}
export interface GetCartDataSellersProducts extends CartProduct {}
