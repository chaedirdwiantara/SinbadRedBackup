import {
  questListInitialState,
  QuestListInitialProps,
  questListReducer,
} from './quest-list.reducer';
/** === TYPE === */
export interface QuestState {
  list: QuestListInitialProps;
}
/** === INITIAL STATE === */
export const questInitialState = {
  list: questListInitialState,
};
/** === REDUCER === */
export const questReducer = ({ list }: QuestState, action: any) => ({
  list: questListReducer(list, action),
});
