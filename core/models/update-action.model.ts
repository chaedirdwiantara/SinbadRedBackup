/** === IMPORT EXTERNAL MODEL === */
import { UpdateSuccessProps } from './update.model';
import { ErrorProps } from './error.model';
/** === PROCESS === */
export interface UpdateProcessAction {
  type: string;
  payload: any;
  contextDispatch: (action: any) => any;
}
/** === SUCCESS === */
export interface UpdateSuccessAction {
  type: string;
  payload: UpdateSuccessProps;
}
/** === FAILED === */
export interface UpdateFailedAction {
  type: string;
  payload: ErrorProps;
}
