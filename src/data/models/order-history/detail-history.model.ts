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
  orderSellerCode: string;
  orderedAt: string;
  orderOrigin: string;
  orderDestination: string;
  orderSellerFailedReason?: string;
  estimationShippedAt?: string;
  products: Array<Products>;
  totalOrderProducts: number;
  paymentMethodName: string;
  totalSellerPriceAfterTax: number;
  totalOrderPriceAfterTax: number;
  isCancellable: boolean;
  isOrderAbleToDone: boolean;
  // WIP
  // shippedAt?: string;
  // cancelledAt?: string;
  // doneAt?: string;
}

export interface OrderHistoryDetailProcessProps
  extends models.DetailProcessProps {}

export interface OrderHistoryDetailProcessAction {
  type: string;
  payload: OrderHistoryDetailProcessProps;
  contextDispatch: (action: any) => any;
}
