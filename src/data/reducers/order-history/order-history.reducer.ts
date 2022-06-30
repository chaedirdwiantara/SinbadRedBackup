/** === IMPORT INTERNAL === */
import {
  listHistoryInitialState,
  ListHistoryProps,
  listHistoryReducer,
} from './list-history/list-history.reducer';
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
  detail: DetailHistoryProps;
  tracking: DetailTrackingHistoryProps;
  menuStatus: ListMenuStatusProps
}
/** === INITIAL STATE === */
export const orderHistoryInitialState = {
  list: listHistoryInitialState,
  detail: detailHistoryInitialState,
  tracking: detailTrackingHistoryInitialState,
  menuStatus: listMenuStatusInitialState,
};
/** === REDUCER === */
export const orderHistoryReducer = (
  { list, detail, tracking, menuStatus }: OrderHistoryState,
  action: any,
) => ({
  list: listHistoryReducer(list, action),
  detail: detailHistoryReducer(detail, action),
  tracking: detailTrackingHistoryReducer(tracking, action),
  menuStatus: listMenuStatusReducer(menuStatus, action)
});
