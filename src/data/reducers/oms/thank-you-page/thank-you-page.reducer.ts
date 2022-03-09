/** === IMPORT HERE === */
import {
  thankYouPageOrderDetailInitialState,
  thankYouPageOrderDetailReducer,
  ThankYouPageOrderDetailInitialProps
} from './thank-you-page-order-detail.reducer';
import { ThankYouPagePaymentGuideListInitialProps, thankYouPagePaymentGuideListInitialState, thankYouPagePaymentGuideListReducer } from './thank-you-page-payment-guide-list.reducer';

/** === TYPE HERE === */
export interface ThankYouPageState {
  detail: ThankYouPageOrderDetailInitialProps;
  paymentGuide: ThankYouPagePaymentGuideListInitialProps
}
/** === INITIAL HERE === */
export const thankYouPageInitialState = {
  detail: thankYouPageOrderDetailInitialState,
  paymentGuide: thankYouPagePaymentGuideListInitialState
};
/** === EXPORT ALL HERE === */
export const thankYouPageReducer = (
  { detail, paymentGuide }: ThankYouPageState,
  action: any,
) => ({
  detail: thankYouPageOrderDetailReducer(detail, action),
  paymentGuide: thankYouPagePaymentGuideListReducer(paymentGuide, action)
});