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
  warehouseName: string;
  leadTime: number;
}

export interface IChangeStock {
  productId: string;
  name: string;
  thumbnail: string;
  currentStock: number;
  qty: number;
}

export interface INotFoundProduct {
  productId: string;
  name: string;
  thumbnail: string;
}

export interface IOtherInformationStock {
  errorMessage: string;
  productId: string;
  name: string;
  thumbnail: string;
}

export interface IStockInformationSuccess {
  change: Array<IChangeStock>;
  notFound: Array<INotFoundProduct>;
  emptyStock: Array<INotFoundProduct>;
  other: Array<IOtherInformationStock>;
}
