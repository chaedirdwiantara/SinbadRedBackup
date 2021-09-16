/** === IMPORT HERE === */
import {
  verificationOrderReducer,
  verificationOrderInitialState,
  VerificationOrderInitialProps,
} from './verification-order/verification-order.reducer';
/** === TYPE HERE === */
export type OmsInitialProps = {
  verificationOrder: VerificationOrderInitialProps;
};
/** === INITIAL HERE === */
export const omsInitialState = {
  verificationOrder: verificationOrderInitialState,
};
/** === EXPORT ALL HERE === */
export const omsReducer = ({ verificationOrder }: any, action: any) => ({
  verificationOrder: verificationOrderReducer(verificationOrder, action),
});
