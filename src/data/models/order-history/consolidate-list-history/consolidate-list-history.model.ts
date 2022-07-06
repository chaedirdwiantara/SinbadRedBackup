import * as models from '@models';

interface Product {
  image: string;
  name: string;
  qty: string;
  uom: string;
  totalProductPriceAfterTax: number;
}
interface ConsolidateOrderParcel {
  id: string;
  sellerName: string;
  statusValue: string;
  statusLabel: string;
  doneAt: string;
  moreProducts: number;
  productId: string;
  productImage: string;
  productName: string;
  productQty: number;
  productUom: string;
  productTotalPriceAfterTax: number;
}

export type ConsolidateOrderListHistory = {
  orderId: string;
  orderedAt: string;
  fulfilment: string;
  totalOrderPrice: number;
  moreSuppliers: number;
  orderParcels: ConsolidateOrderParcel[];
};

export interface ConsolidateOrderListHistoryQueryOptions {
  page?: number;
  perPage?: number;
  status?: string;
  orderGroupStatus?: string;
  subOrderGroupStatus?: string;
  keyword?: string;
}

export type ConsolidateOrderListHistoryProcessProps = Omit<
  models.ListProcessDefaultV3Props,
  'sort' | 'sortBy' | 'limit' | 'skip'
> &
  ConsolidateOrderListHistoryQueryOptions;
