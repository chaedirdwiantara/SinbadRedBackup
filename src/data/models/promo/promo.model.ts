/** === PROMO PAYMENT LIST === */
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
/** => success props */
export interface PromoPaymentListSuccessProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  discountRebate: number;
  image: string;
}
/** === PROMO PAYMENT DETAIL === */
export interface PromoPaymentDetailSuccessProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  discountRebate: number;
  termAndConditions: string[];
}
/** === PROMO GENERAL DETAIL === */
export interface PromoGeneralDetailSuccessProps {
  id: number;
  name: string;
  shortDescription: string;
  header: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  termsAndCondition: string[];
}
