export interface ReserveStockError {
  change: StockErrorChange[];
  notFound: StockEmptyOrNotFound[];
  emptyStock: StockEmptyOrNotFound[];
  other: StockErrorOther[];
}

export interface StockErrorChange {
  productId: string;
  name: string;
  thumbnail: string;
  currentStock: number;
  qty: number;
}

export interface StockEmptyOrNotFound {
  productId: string;
  name: string;
  thumbnail: string;
}

export interface StockErrorOther {
  errorMessage: string;
  productId: string;
  name: string;
  thumbnail: string;
}

export interface ReserveStockPayload {
  id: string;
  data: ReserveStockPayloadData[];
  reservedAt: string;
}

export interface ReserveStockPayloadData {
  invoiceGroupId: string;
  brands: ReserveStockPayloadBrand[];
}

export interface ReserveStockPayloadBrand {
  brandId: string;
  products: ReserveStockPayloadProducts[];
}

export interface ReserveStockPayloadProducts {
  productId: string;
  qty: number;
  warehouseId: number;
}
