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
import {
  reserveStockDetailInitialState,
  reserveStockDetailReducer,
} from './reserve-stock-detail.reducer';
/** === TYPE HERE === */
export type ReserveStockInitialProps = models.DeleteProps &
  models.CreateProps &
  models.DetailProps<models.ReserveStockError>;
/** === INITIAL HERE === */
export const reserveStockInitialState = {
  delete: reserveStockDeleteInitialState,
  create: reserveStockCreateInitialState,
  detail: reserveStockDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const reserveStockReducer = (
  { del, create, detail }: any,
  action: any,
) => ({
  delete: reserveStockDeleteReducer(del, action),
  create: reserveStockCreateReducer(create, action),
  detail: reserveStockDetailReducer(detail, action),
});
