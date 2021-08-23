/** === IMPORT HERE === */
import * as models from '@models';
import {
  example2ListReducer,
  example2ListInitialState,
} from './example2-list.reducer';
import {
  example2DetailReducer,
  example2DetailInitialState,
} from './example2-detail.reducer';
/** === TYPE HERE === */
export type Example2InitialProps = models.ListProps<models.Example2[]> &
  models.DetailProps<models.Example2>;
/** === INITIAL HERE === */
export const example2InitialState = {
  list: example2ListInitialState,
  detail: example2DetailInitialState,
};
/** === EXPORT ALL HERE === */
export const example2Reducer = ({ list, detail }: any, action: any) => ({
  list: example2ListReducer(list, action),
  detail: example2DetailReducer(detail, action),
});
