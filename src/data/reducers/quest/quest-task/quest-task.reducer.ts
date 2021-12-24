/** === IMPORT HERE === */
import * as models from '@models';
import {
  questTaskUpdateInitialState,
  questTaskUpdateReducer,
} from './quest-task-update.reducer';
/** === TYPE HERE */
export type QuestTaskInitialProps = models.UpdateProps;
/** === INITIAL HERE === */
export const questTaskInitialState = {
  update: questTaskUpdateInitialState,
};
/** === EXPORT ALL HERE === */
export const questTaskReducer = ({ update }: any, action: any) => ({
  update: questTaskUpdateReducer(update, action),
});
