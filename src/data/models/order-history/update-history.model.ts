export interface UpdateOrderHistoryProcessProps {
  id: string;
  type: 'list' | 'detail' | 'detail_consolidate';
  orderGroupStatus?: string;
  subOrderGroupStatus?: string;
  status?: string;
  keyword?: string;
  orderId?: string;
}

export interface UpdateOrderHistoryProcessAction {
  type: string;
  payload: UpdateOrderHistoryProcessProps;
  contextDispatch: (action: any) => any;
}
