import * as models from '@models';
import { PaymentStatusSlug, OrderStatusSlug } from '@screen/history/types';

export interface OrderParcels {
  id: number;
  orderCode: string;
  createdAt: string;
  parcelFinalPrice: number;
  parcelFinalPriceBuyer: number;
  parcelQty: number;
  deliveredParcelFinalPrice: number;
  deliveredParcelFinalPriceBuyer: number;
  deliveredParcelQty: number;
  deliveredParcelModified: boolean;
  statusPayment: PaymentStatusSlug;
  status: OrderStatusSlug;
  catalogueImages: Array<string>;
  billing: BillingParcel;
}

interface BillingParcel {
  id: number | null;
  totalPayment: number | null;
  deliveredTotalPayment: number | null;
  billingStatus: string | null;
  paymentTypeId: number | null;
  paymentChannelId: number | null;
  expiredPaymentTime: string | null;
}

export type OrderStatusQuery = OrderStatusSlug | '';

export type PaymentStatusQuery = PaymentStatusSlug | '';

export interface HistoryListQueryOptions {
  statusOrder?: OrderStatusQuery;
  statusPayment?: PaymentStatusQuery;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export type HistoryListProcessProps = Omit<
  models.ListProcessDefaultProps,
  'sort' | 'sortBy' | 'keyword'
> &
  HistoryListQueryOptions;
