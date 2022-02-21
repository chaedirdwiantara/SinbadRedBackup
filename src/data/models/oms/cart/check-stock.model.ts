/**
 * CHECK STOCK
 */

export interface CheckStockResponse {
  productId: string;
  warehouseId: number;
  stock: number;
  status: string;
}

export interface CheckStockPayload {
  reserved: boolean;
  cartId: string;
  carts: CheckStockPayloadCarts[];
}

export interface CheckStockPayloadCarts {
  productId: string;
  warehouseId: number;
}
