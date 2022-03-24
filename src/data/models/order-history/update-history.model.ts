export interface UpdateOrderHistoryProcessProps {
  id: string;
  type: 'list' | 'detail';
  status?: string;
  keyword?: string;
  orderStatus?: string;
}

export interface UpdateOrderHistoryProcessAction {
  type: string;
  payload: UpdateOrderHistoryProcessProps;
  contextDispatch: (action: any) => any;
}
