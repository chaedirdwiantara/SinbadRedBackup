/** === IMPORT EXTERNAL MODEL === */
import { ListProcessProps, ListSuccessProps } from './list.model';
import { ErrorProps } from './error.model';
/** === PROCESS === */
export interface ListProcessAction {
  type: string;
  payload: ListProcessProps;
  contextDispatch: (action: any) => any;
}
/** === SUCCESS === */
export interface ListSuccessAction<T> {
  type: string;
  payload: ListSuccessProps<T>;
}
/** === FAILED === */
export interface ListFailedAction {
  type: string;
  payload: ErrorProps;
}
