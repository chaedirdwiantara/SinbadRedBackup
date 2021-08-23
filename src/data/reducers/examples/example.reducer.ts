/** === IMPORT HERE === */
import * as models from '../../models';
import {
  exampleListReducer,
  exampleListInitialState,
} from './example-list.reducer';
import {
  exampleDetailReducer,
  exampleDetailInitialState,
} from './example-detail.reducer';
/** === TYPE HERE === */
export type ExampleInitialProps = models.ListProps<models.Example[]> &
  models.DetailProps<models.Example>;
/** === INITIAL HERE === */
export const exampleInitialState = {
  list: exampleListInitialState,
  detail: exampleDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const exampleReducer = ({ list, detail }: any, action: any) => ({
  list: exampleListReducer(list, action),
  detail: exampleDetailReducer(detail, action),
});
