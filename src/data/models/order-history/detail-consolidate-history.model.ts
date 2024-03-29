import * as models from '@models';

export interface OrderParcels {
  id: string;
  sellerName: string;
  statusValue: string;
  statusLabel: string;
  isDisplayTrack: boolean;
  isDisplayDelivered: boolean;
  doneAt: string;
  moreProducts: number;
  totalOrderParcelAfterTax: number;
  productId: string;
  productImage: string;
  productName: string;
  productQty: number;
  productUom: string;
  productTotalPriceAfterTax: number;
}

export interface orderConsolidateDetailHistory {
  orderId: string;
  orderedAt: string;
  fulfilment: string;
  totalSupplier: number;
  paymentMethod: string;
  totalOrderParcelsAfterTax: number;
  totalOrderPriceAfterTax: number;
  sinbadVoucherDiscountOrder: number;
  totalOrderPrice: number;
  totalQty: number;
  orderParcels: Array<OrderParcels>;
}
export interface OrderConsolidateHistoryDetailProcessProps {
  id?: string;
  orderId?: string;
}

export interface OrderConsolidateHistoryDetailProcessAction {
  type: string;
  payload: OrderConsolidateHistoryDetailProcessProps;
  contextDispatch: (action: any) => any;
}
