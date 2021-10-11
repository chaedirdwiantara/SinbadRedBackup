/** === IMPORT HERE === */
import * as models from '@models';
import {
  numberOfEmployeeListReducer,
  numberOfEmployeeListInitialState,
} from './number-of-employee-list.reducer';
/** === TYPE HERE === */
export type NumberOfEmployeeInitialProps = models.ListProps<
  models.NumberOfEmployeeList[]
>;
// export type ProfileEditInitialProps = models.UpdateProps;
/** === INITIAL HERE === */
export const numberOfEmployeeInitialState = {
  list: numberOfEmployeeListInitialState,
};
/** === EXPORT ALL HERE === */
export const merchantReducer = ({ list }: any, action: any) => ({
  list: numberOfEmployeeListReducer(list, action),
});
