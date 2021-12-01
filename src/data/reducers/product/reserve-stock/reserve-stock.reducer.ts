/** === IMPORT HERE === */
import * as models from '@models';
import {
  reserveStockDeleteReducer,
  reserveStockDeleteInitialState,
} from './reserve-stock-delete.reducer';
import {
  reserveStockCreateReducer,
  reserveStockCreateInitialState,
} from './reserve-stock-create.reducer';
/** === TYPE HERE === */
export type ReserveStockInitialProps = models.DeleteProps & models.CreateProps;
/** === INITIAL HERE === */
export const reserveStockInitialState = {
  delete: reserveStockDeleteInitialState,
  create: reserveStockCreateInitialState,
};
/** === EXPORT ALL HERE === */
export const reserveStockReducer = ({ del, create }: any, action: any) => ({
  delete: reserveStockDeleteReducer(del, action),
  create: reserveStockCreateReducer(create, action),
});
