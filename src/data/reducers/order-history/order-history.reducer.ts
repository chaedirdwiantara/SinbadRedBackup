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
/** === TYPE === */
export interface OrderHistoryState {
  list: ListHistoryProps;
  detail: DetailHistoryProps;
}
/** === INITIAL STATE === */
export const orderHistoryInitialState = {
  list: listHistoryInitialState,
  detail: detailHistoryInitialState,
};
/** === REDUCER === */
export const orderHistoryReducer = (
  { list, detail }: OrderHistoryState,
  action: any,
) => ({
  list: listHistoryReducer(list, action),
  detail: detailHistoryReducer(detail, action),
});
