import * as models from '@models';

interface Product {
  image: string;
  name: string;
  qty: string;
  uom: string;
  totalPrice: number;
}

export type OrderListHistory = {
  id: string;
  sellerName: string;
  statusValue: string;
  statusLabel: string;
  product: Product;
  totalOrderProducts: number;
  totalOrderPrice: number;
  orderedAt: string;
  isCancellable: boolean;
  isOrderAbleToDone: boolean;
};

export interface OrderListHistoryQueryOptions {
  page?: number;
  perPage?: number;
  status?: string;
  orderStatus?: string;
  keyword?: string;
}

export type OrderListHistoryProcessProps = Omit<
  models.ListProcessDefaultV3Props,
  'sort' | 'sortBy' | 'limit' | 'skip'
> &
  OrderListHistoryQueryOptions;
