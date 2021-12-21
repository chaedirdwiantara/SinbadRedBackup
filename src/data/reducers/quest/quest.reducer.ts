import {
  questGeneralInitialState,
  questGeneralReducer,
  QuestGeneralInitialProps,
} from './quest-general/quest-general.reducer';
/** === TYPE === */
export type QuestInitialProps = {
  questGeneral: QuestGeneralInitialProps;
};
/** === INITIAL STATE === */
export const questInitialState = {
  questGeneral: questGeneralInitialState,
};
/** === REDUCER === */
export const questReducer = ({ questGeneral }: any, action: any) => ({
  questGeneral: questGeneralReducer(questGeneral, action),
});
