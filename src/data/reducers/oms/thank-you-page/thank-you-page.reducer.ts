/** === IMPORT HERE === */
import { 
  ThankYouPageCancelOrderInitialProps, 
  thankYouPageCancelOrderInitialState, 
  thankYouPageCancelOrderReducer 
} from './thank-you-page-cancel-order.reducer';
import {
  thankYouPageOrderDetailInitialState,
  thankYouPageOrderDetailReducer,
  ThankYouPageOrderDetailInitialProps
} from './thank-you-page-order-detail.reducer';
import { 
  ThankYouPagePaymentGuideListInitialProps, 
  thankYouPagePaymentGuideListInitialState, 
  thankYouPagePaymentGuideListReducer
 } from './thank-you-page-payment-guide-list.reducer';

/** === TYPE HERE === */
export interface ThankYouPageState {
  detail: ThankYouPageOrderDetailInitialProps;
  paymentGuide: ThankYouPagePaymentGuideListInitialProps
  cancelOrder: ThankYouPageCancelOrderInitialProps
}
/** === INITIAL HERE === */
export const thankYouPageInitialState = {
  detail: thankYouPageOrderDetailInitialState,
  paymentGuide: thankYouPagePaymentGuideListInitialState,
  cancelOrder: thankYouPageCancelOrderInitialState
};
/** === EXPORT ALL HERE === */
export const thankYouPageReducer = (
  { detail, paymentGuide, cancelOrder }: ThankYouPageState,
  action: any,
) => ({
  detail: thankYouPageOrderDetailReducer(detail, action),
  paymentGuide: thankYouPagePaymentGuideListReducer(paymentGuide, action),
  cancelOrder: thankYouPageCancelOrderReducer(cancelOrder, action)
});