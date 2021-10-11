/** === IMPORT HERE === */
import * as models from '@models';
import {
  verificationOrderCreateReducer,
  verificationOrderCreateInitialState,
} from './verification-order-create.reducer';
import {
  verificationOrderDetailInitialState,
  verificationOrderDetailReducer,
} from './verification-order-detail.reducer';
/** === TYPE HERE === */
export type VerificationOrderInitialProps = models.CreateProps &
  models.DetailProps<models.VerificationOrderDetailProps>;
/** === INITIAL HERE === */
export const verificationOrderInitialState = {
  create: verificationOrderCreateInitialState,
  detail: verificationOrderDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const verificationOrderReducer = (
  { create, detail }: any,
  action: any,
) => ({
  create: verificationOrderCreateReducer(create, action),
  detail: verificationOrderDetailReducer(detail, action),
});
