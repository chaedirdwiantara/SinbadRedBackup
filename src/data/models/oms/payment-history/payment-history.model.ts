import * as models from '@models';

export type WaitingPaymentListHistory = {
  id: number;
  paymentExpiredDate: string;
  paymentIconUrl: string;
  paymentDisplayLabel: string;
  vaAccountNo: string;
  totalOrderPriceAfterTax: string;
};

export interface PaymentListHistoryQueryOptions {
  page?: number;
  perPage?: number;
  status?: string;
  orderStatus?: string;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  keyword?: string;
}

export type PaymentListHistoryProcessProps = Omit<
  models.ListProcessDefaultV3Props,
  'sort' | 'sortBy' | 'limit' | 'skip'
> &
  PaymentListHistoryQueryOptions;
