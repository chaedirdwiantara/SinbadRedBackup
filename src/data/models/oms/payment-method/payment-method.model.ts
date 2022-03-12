export interface PaymentMethodList {
  skip: string;
  limit: string;
  keyword: string;
  sort: string;
  sortBy: string;
  amount: number;
}

export interface PaymentMethodGetWaitingPaymentOrder {
  skip: string;
  limit: string;
  keyword: string;
  sort: string;
  sortBy: string;
  amount: string;
  status: string;
}
