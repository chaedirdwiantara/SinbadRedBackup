/**
 *  TOTAL CART
 */

export interface GetTotalCart {
  data: TotalCartData;
}

export interface TotalCartData {
  id: string;
  totalProducts: number;
  createdAt: string;
  updatedAt: string;
}
