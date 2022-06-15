/**
 * CHECK STOCK
 */

export interface CheckStockResponse {
  productId: string;
  warehouseId: number;
  stock: number;
  isAvailable: boolean;
  isReserved: boolean;
  warehouseName: string;
  leadTime: number;
  externalWarehouseCode: string;
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
