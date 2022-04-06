import * as models from '@models';

export interface Products {
  id: string;
  image: string;
  name: string;
  qty: string;
  uom: string;
  price: number;
  totalPrice: number;
}

export interface orderDetailHistory {
  id: string;
  statusValue: string;
  statusLabel: string;
  orderSellerFailedReason?: string;
  orderSellerCode: string;
  orderedAt: string;
  orderOrigin: string;
  orderDestination: string;
  estimationDeliveredAt?: string;
  estimationShippedAt?: string;
  shippedAt?: string;
  cancelledAt?: string;
  doneAt?: string;
  products: Array<Products>;
  totalOrderProducts: number;
  paymentMethodName: string;
  totalProductsPrice: number;
  totalOrderPrice: number;
  isCancellable: boolean;
  isOrderAbleToDone: boolean;
}

export interface OrderHistoryDetailProcessProps
  extends models.DetailProcessProps {}

export interface OrderHistoryDetailProcessAction {
  type: string;
  payload: OrderHistoryDetailProcessProps;
  contextDispatch: (action: any) => any;
}
