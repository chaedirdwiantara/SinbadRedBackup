/** === IMPORT INTERNAL === */
import {
  listHistoryInitialState,
  ListHistoryProps,
  listHistoryReducer,
} from './list-history/list-history.reducer';
import {
  DetailConsolidateHistoryProps,
  detailConsolidateHistoryInitialState,
  detailConsolidateHistoryReducer,
} from './detail-consolidate-history/detail-consolidate-history.reducer';
import {
  DetailHistoryProps,
  detailHistoryInitialState,
  detailHistoryReducer,
} from './detail-history/detail-history.reducer';
import {
  DetailTrackingHistoryProps,
  detailTrackingHistoryInitialState,
  detailTrackingHistoryReducer,
} from './detail-tracking-history/detail-tracking-history.reducer';
import { listMenuStatusInitialState, ListMenuStatusProps, listMenuStatusReducer } from './menu-status-list/menu-status-list.reducer';
/** === TYPE === */
export interface OrderHistoryState {
  list: ListHistoryProps;
  consolidateDetail: DetailConsolidateHistoryProps;
  detail: DetailHistoryProps;
  tracking: DetailTrackingHistoryProps;
  menuStatus: ListMenuStatusProps
}
/** === INITIAL STATE === */
export const orderHistoryInitialState = {
  list: listHistoryInitialState,
  consolidateDetail: detailConsolidateHistoryInitialState,
  detail: detailHistoryInitialState,
  tracking: detailTrackingHistoryInitialState,
  menuStatus: listMenuStatusInitialState,
};
/** === REDUCER === */
export const orderHistoryReducer = (
  { list, consolidateDetail, detail, tracking, menuStatus }: OrderHistoryState,
  action: any,
) => ({
  list: listHistoryReducer(list, action),
  consolidateDetail: detailConsolidateHistoryReducer(consolidateDetail, action),
  detail: detailHistoryReducer(detail, action),
  tracking: detailTrackingHistoryReducer(tracking, action),
  menuStatus: listMenuStatusReducer(menuStatus, action)
});
