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
/** === TYPE HERE === */
export type ReserveDiscountInitialProps = models.DeleteProps &
  models.CreateProps;
/** === INITIAL HERE === */
export const reserveDiscountInitialState = {
  delete: reserveDiscountDeleteInitialState,
  create: reserveDiscountCreateInitialState,
};
/** === EXPORT ALL HERE === */
export const reserveDiscountReducer = ({ del, create }: any, action: any) => ({
  delete: reserveDiscountDeleteReducer(del, action),
  create: reserveDiscountCreateReducer(create, action),
});
