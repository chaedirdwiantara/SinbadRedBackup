export interface UpdateOrderHistoryProcessProps {
  id: string;
  type: 'list' | 'detail' | 'detail_consolidate';
  status?: string;
  keyword?: string;
  orderStatus?: string;
  orderId?: string;
}

export interface UpdateOrderHistoryProcessAction {
  type: string;
  payload: UpdateOrderHistoryProcessProps;
  contextDispatch: (action: any) => any;
}
