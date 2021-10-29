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
