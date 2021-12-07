export interface StockValidationProcessAction {
  type: string;
  payload: StockValidationProcessProps;
  contextDispatch: (action: any) => any;
}

export interface StockValidationProcessProps {
  warehouseId: number | null;
  productId: string;
}

export interface IStockValidaitonSuccess {
  message: string;
  stock: number;
}
