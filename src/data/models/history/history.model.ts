export interface OrderStatus {
  status: String;
  title: String;
  detail: String;
}

export interface OrderStatusSuccessProps extends Array<OrderStatus> {}

export interface DetailOrderStatusProcessAction {
  type: string;
  contextDispatch: (action: any) => any;
}
