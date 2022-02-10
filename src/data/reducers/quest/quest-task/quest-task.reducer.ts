/** === IMPORT HERE === */
import * as models from '@models';
import {
  questTaskUpdateInitialState,
  questTaskUpdateReducer,
} from './quest-task-update.reducer';
import {
  questTaskDetailInitialState,
  questTaskDetailReducer,
} from './quest-task-detail.reducer';
/** === TYPE HERE */
export type QuestTaskInitialProps = models.UpdateProps &
  models.DetailProps<models.QuestTaskDetailItem>;
/** === INITIAL HERE === */
export const questTaskInitialState = {
  update: questTaskUpdateInitialState,
  detail: questTaskDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const questTaskReducer = ({ update, detail }: any, action: any) => ({
  update: questTaskUpdateReducer(update, action),
  detail: questTaskDetailReducer(detail, action),
});
