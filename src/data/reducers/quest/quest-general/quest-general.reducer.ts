/** === IMPORT HERE === */
import * as models from '@models';
import {
  questGeneralListInitialState,
  questGeneralListReducer,
} from './quest-general-list.reducer';
import {
  questGeneralDetailInitialState,
  questGeneralDetailReducer,
} from './quest-general-detail.reducer';
/** === TYPE HERE */
export type QuestGeneralInitialProps = models.ListProps<
  models.QuestListItem[]
> &
  models.DetailProps<models.QuestDetailItem>;
/** === INITIAL HERE === */
export const questGeneralInitialState = {
  list: questGeneralListInitialState,
  detail: questGeneralDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const questGeneralReducer = ({ list, detail }: any, action: any) => ({
  list: questGeneralListReducer(list, action),
  detail: questGeneralDetailReducer(detail, action),
});
