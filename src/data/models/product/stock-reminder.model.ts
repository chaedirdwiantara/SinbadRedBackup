import * as models from '@models';

export type StockReminderItem = {
  productId: string;
  warehouseId: number;
  stockRemind: boolean;
};

export type StockReminderGetProps = Omit<StockReminderItem, 'stockRemind'>;

export interface StockReminderListItemProps
  extends Pick<
    models.ListItemV3Props<Array<StockReminderItem>>,
    'data' | 'loading'
  > {}

export interface StockReminderListSuccess {
  data: Array<StockReminderItem>;
}

export interface StockReminderListSuccessAction {
  type: string;
  payload: StockReminderListSuccess;
}

export interface StockReminderListProcessAction {
  type: string;
  payload: Array<StockReminderGetProps>;
  contextDispatch: (action: any) => any;
}

export interface CreateStockReminderProcessAction {
  type: string;
  payload: StockReminderGetProps;
  contextDispatch: (action: any) => any;
}

interface payloadCreateStockSuccessAction
  extends models.CreateSuccessProps,
    StockReminderGetProps {}
export interface CreateStockReminderSuccessAction {
  type: string;
  payload: payloadCreateStockSuccessAction;
  contextDispatch: (action: any) => any;
}

export interface CreateStockReminderSuccessProps
  extends models.CreateSuccessProps,
    StockReminderGetProps {}

export type StockReminderProcessProps = Array<StockReminderGetProps>;
