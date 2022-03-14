/**
 * CHECK STOCK
 */

export interface CheckStockResponse {
  productId: string;
  warehouseId: number;
  warehouseName: string;
  stock: number;
  status: string;
  isReserved: boolean;
}

export interface CheckStockPayload {
  reserved: boolean;
  cartId: string;
  carts: CheckStockPayloadCarts[];
}

export interface CheckStockPayloadCarts {
  productId: string;
  warehouseId: number;
  qty: number;
}
