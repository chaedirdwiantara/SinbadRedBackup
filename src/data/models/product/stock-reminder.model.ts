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

// export interface StockReminderProcessProps extends models.ListProcessV3Props {
//   data: Array<StockReminderGetProps>;
// }

export type StockReminderProcessProps = Array<StockReminderGetProps>;
