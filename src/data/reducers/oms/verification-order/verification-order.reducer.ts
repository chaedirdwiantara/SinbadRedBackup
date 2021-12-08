/** === IMPORT HERE === */
import {
  verificationOrderCreateReducer,
  verificationOrderCreateInitialState,
  VerificationOrderCreateInitialProps,
} from './verification-order-create.reducer';
import {
  verificationOrderDetailInitialState,
  verificationOrderDetailReducer,
  VerificationOrderDetailInitialProps,
} from './verification-order-detail.reducer';
/** === TYPE HERE === */
export interface VerificationOrderState {
  create: VerificationOrderCreateInitialProps;
  detail: VerificationOrderDetailInitialProps;
}
/** === INITIAL HERE === */
export const verificationOrderInitialState = {
  create: verificationOrderCreateInitialState,
  detail: verificationOrderDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const verificationOrderReducer = (
  { create, detail }: VerificationOrderState,
  action: any,
) => ({
  create: verificationOrderCreateReducer(create, action),
  detail: verificationOrderDetailReducer(detail, action),
});
