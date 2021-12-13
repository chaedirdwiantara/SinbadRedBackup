/** === IMPORT HERE === */
import * as models from '@models';
import {
  reserveDiscountDeleteReducer,
  reserveDiscountDeleteInitialState,
} from './reserve-discount-delete.reducer';
import {
  reserveDiscountCreateReducer,
  reserveDiscountCreateInitialState,
} from './reserve-discount-create.reducer';
import {
  reserveDiscountDetailReducer,
  reserveDiscountDetailInitialState,
} from './reserve-discount-detail.reducer';
/** === TYPE HERE === */
export type ReserveDiscountInitialProps = models.DeleteProps &
  models.CreateProps &
  models.DetailProps<models.ReserveDiscountDetail>;
/** === INITIAL HERE === */
export const reserveDiscountInitialState = {
  delete: reserveDiscountDeleteInitialState,
  create: reserveDiscountCreateInitialState,
  detail: reserveDiscountDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const reserveDiscountReducer = (
  { del, create, detail }: any,
  action: any,
) => ({
  delete: reserveDiscountDeleteReducer(del, action),
  create: reserveDiscountCreateReducer(create, action),
  detail: reserveDiscountDetailReducer(detail, action),
});
