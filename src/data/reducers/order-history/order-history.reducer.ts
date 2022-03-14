/** === IMPORT INTERNAL === */
import {
  listHistoryInitialState,
  ListHistoryProps,
  listHistoryReducer,
} from './list-history/list-history.reducer';
/** === TYPE === */
export interface OrderHistoryState {
  list: ListHistoryProps;
}
/** === INITIAL STATE === */
export const orderHistoryInitialState = {
  list: listHistoryInitialState,
};
/** === REDUCER === */
export const orderHistoryReducer = (
  { list }: OrderHistoryState,
  action: any,
) => ({
  list: listHistoryReducer(list, action),
});
