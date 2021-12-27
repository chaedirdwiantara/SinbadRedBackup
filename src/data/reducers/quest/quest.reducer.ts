import {
  questGeneralInitialState,
  questGeneralReducer,
  QuestGeneralInitialProps,
} from './quest-general/quest-general.reducer';
import {
  questTaskInitialState,
  questTaskReducer,
  QuestTaskInitialProps,
} from './quest-task/quest-task.reducer';
/** === TYPE === */
export type QuestInitialProps = {
  questGeneral: QuestGeneralInitialProps;
  questTask: QuestTaskInitialProps;
};
/** === INITIAL STATE === */
export const questInitialState = {
  questGeneral: questGeneralInitialState,
  questTask: questTaskInitialState,
};
/** === REDUCER === */
export const questReducer = (
  { questGeneral, questTask }: any,
  action: any,
) => ({
  questGeneral: questGeneralReducer(questGeneral, action),
  questTask: questTaskReducer(questTask, action),
});
