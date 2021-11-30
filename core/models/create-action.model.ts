/** === IMPORT EXTERNAL MODEL === */
import { CreateSuccessProps } from './create.model';
import { ErrorProps } from './error.model';
/** === PROCESS === */
export interface CreateProcessAction<T> {
  type: string;
  payload: T;
  contextDispatch: (action: any) => any;
}
/** === SUCCESS === */
export interface CreateSuccessAction {
  type: string;
  payload: CreateSuccessProps;
}
/** === FAILED === */
export interface CreateFailedAction {
  type: string;
  payload: ErrorProps;
}
