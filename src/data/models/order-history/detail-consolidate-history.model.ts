import * as models from '@models';

export interface ConsolidateProducts {
  id: string;
  image: string;
  name: string;
  qty: number;
  uom: string;
  totalPriceAfterTax: number;
}

export interface OrderParcels {
  id: string;
  sellerName: string;
  statusValue: string;
  statusLabel: string;
  isDisplayTrack: boolean;
  isDisplayDelivered: boolean;
  doneAt: string;
  moreProducts: number;
  products: Array<ConsolidateProducts>;
}

export interface orderConsolidateDetailHistory {
  orderId: string;
  orderedAt: string;
  fulfilment: string;
  totalSupplier: number;
  paymentMethod: string;
  totalOrderParcelsAfterTax: number;
  totalOrderPriceAfterTax: number;
  orderParcels: Array<OrderParcels>;
}

export interface OrderConsolidateHistoryDetailProcessProps
  extends models.DetailProcessProps {}

export interface OrderConsolidateHistoryDetailProcessAction {
  type: string;
  payload: OrderConsolidateHistoryDetailProcessProps;
  contextDispatch: (action: any) => any;
}
