/** === PROMO PAYMENT LIST === */
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
/** === PROMO GENERRAL DETAIL === */
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
