import * as models from '@models';

export interface ConsolidateProducts {
  id: string;
  code: string;
  image: string;
  name: string;
  qty: string;
  uom: string;
  productTax: number;
  totalProductTax: number;
  productPriceBeforeTax: number;
  productPriceAfterTax: number;
  totalProductPriceBeforeTax: number;
  totalProductPriceAfterTax: number;
}

export interface orderConsolidateDetailHistory {
  id: string;
  statusValue: string;
  statusLabel: string;
  orderSellerCode: string;
  orderedAt: string;
  orderOrigin: string;
  orderDestination: string;
  orderSellerFailedReason?: string;
  estimationShippedAt?: string;
  products: Array<ConsolidateProducts>;
  totalOrderProducts: number;
  paymentMethodName: string;
  totalSellerPriceAfterTax: number;
  totalOrderPriceAfterTax: number;
  isCancellable: boolean;
  isOrderAbleToDone: boolean;
  shippedAt?: string;
  cancelledAt?: string;
  doneAt?: string;
}

export interface OrderConsolidateHistoryDetailProcessProps
  extends models.DetailProcessProps {}

export interface OrderConsolidateHistoryDetailProcessAction {
  type: string;
  payload: OrderConsolidateHistoryDetailProcessProps;
  contextDispatch: (action: any) => any;
}
