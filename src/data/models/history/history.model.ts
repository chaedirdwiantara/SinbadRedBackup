export interface OrderStatus {
  status: string;
  title: string;
  detail: string;
}

export interface OrderStatusSuccessProps extends Array<OrderStatus> {}

export interface DetailOrderStatusProcessAction {
  type: string;
  contextDispatch: (action: any) => any;
}
