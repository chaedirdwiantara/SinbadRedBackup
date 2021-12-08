/** === IMPORT HERE === */
import * as models from '@models';
import {
  reserveDiscountDeleteReducer,
  reserveDiscountDeleteInitialState,
} from './reserve-discount-delete.reducer';
/** === TYPE HERE === */
export type ReserveDiscountInitialProps = models.DeleteProps;
/** === INITIAL HERE === */
export const reserveDiscountInitialState = {
  delete: reserveDiscountDeleteInitialState,
};
/** === EXPORT ALL HERE === */
export const reserveDiscountReducer = ({ del }: any, action: any) => ({
  delete: reserveDiscountDeleteReducer(del, action),
});
