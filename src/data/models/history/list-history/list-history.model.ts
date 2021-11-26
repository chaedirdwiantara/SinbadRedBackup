import * as model from '@models';

export interface HistoryListSuccessAction {
  type: string;
  payload: HistoryList;
}

export interface HistoryListProcessProps extends model.ListProcessProps {
  status?: string;
  paymentStatus?: string;
  startOrderDate?: string;
  endOrderDate?: string;
}

export interface HistoryListSuccessProps extends OrderParcels {}

export interface HistoryListItemProps
  extends model.ListItemProps<Array<OrderParcels>> {
  canLoadMore: boolean;
}

export interface HistoryList {
  data: Array<OrderParcels>;
  meta: OrderPagination;
}

export interface OrderParcels {
  id: number;
  orderCode: string;
  createdAt: string;
  statusPayment: string;
  parcelFinalPrice: number;
  parcelQty: number;
  status: string;
  catalogueImages: Array<string>;
  billing: BillingParcel;
}

interface BillingParcel {
  id: string;
  totalPayment: number;
  deliveredTotalPayment: number;
  billingStatus: string;
  paymentTypeId: number;
  paymentChannelId: number;
  expiredPaymentTime: string;
}

export interface OrderPagination {
  limit: number;
  skip: number;
  total: number;
  canLoadMore: boolean;
}
