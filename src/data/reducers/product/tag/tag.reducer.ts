/** === IMPORT INTERNAL === */
import * as models from '@models';
import {
  tagListInitialState,
  TagListInitialProps,
  tagListReducer,
} from './tag-list.reducer';
/** === TYPES === */
export type TagInitialProps = models.TagListProps;

interface TagState {
  list: TagListInitialProps;
}
/** === INITIAL STATE === */
export const tagInitialState = {
  list: tagListInitialState,
};
/** === REDUCER === */
export const tagReducer = ({ list }: TagState, action: any) => ({
  list: tagListReducer(list, action),
});
