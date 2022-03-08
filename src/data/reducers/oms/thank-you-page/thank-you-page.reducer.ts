/** === IMPORT HERE === */
import {
  thankYouPageOrderDetailInitialState,
  thankYouPageOrderDetailReducer,
  ThankYouPageOrderDetailInitialProps
} from './thank-you-page-order-detail.reducer';

/** === TYPE HERE === */
export interface ThankYouPageState {
  detail: ThankYouPageOrderDetailInitialProps;
}
/** === INITIAL HERE === */
export const thankYouPageInitialState = {
  detail: thankYouPageOrderDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const thankYouPageReducer = (
  { detail }: ThankYouPageState,
  action: any,
) => ({
  detail: thankYouPageOrderDetailReducer(detail, action),
});