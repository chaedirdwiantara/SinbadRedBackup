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
/** === TYPE === */
export interface OrderHistoryState {
  list: ListHistoryProps;
  consolidateDetail: DetailConsolidateHistoryProps;
  detail: DetailHistoryProps;
  tracking: DetailTrackingHistoryProps;
}
/** === INITIAL STATE === */
export const orderHistoryInitialState = {
  list: listHistoryInitialState,
  consolidateDetail: detailConsolidateHistoryInitialState,
  detail: detailHistoryInitialState,
  tracking: detailTrackingHistoryInitialState,
};
/** === REDUCER === */
export const orderHistoryReducer = (
  { list, consolidateDetail, detail, tracking }: OrderHistoryState,
  action: any,
) => ({
  list: listHistoryReducer(list, action),
  consolidateDetail: detailConsolidateHistoryReducer(consolidateDetail, action),
  detail: detailHistoryReducer(detail, action),
  tracking: detailTrackingHistoryReducer(tracking, action),
});
