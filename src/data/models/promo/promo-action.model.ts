/** => process props */
export interface PromoPaymentListProcessProps {
  loading: boolean;
  skip: number;
  limit: number;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  search?: string;
  invoiceGroupId: string;
}
/** => process action */
export interface PromoPaymentListProcessAction {
  type: string;
  payload: PromoPaymentListProcessProps;
  contextDispatch: (action: any) => any;
}
export interface CheckPromoPaymentGetPayload {
  paymentTypeId: number;
  paymentChannelId: Array<number>;
  parcelPrice: number;
  invoiceGroupId: string;
  sellerId: number;
}
export interface CheckPromoPaymentListProcessAction {
  type: string;
  payload: CheckPromoPaymentGetPayload;
  contextDispatch: (action: any) => any;
}
export interface CheckAllPromoPaymentPostPayload {
  invoiceGroupId: string;
  cartParcelId: string;
  paymentTypeId: number;
  paymentChannelId: number;
  parcelPrice: number;
}
