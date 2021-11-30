/** === IMPORT EXTERNAL MODEL === */
import { DeleteSuccessProps, DeleteProcessProps } from './delete.model';
import { ErrorProps } from './error.model';
/** === PROCESS === */
export interface DeleteProcessAction {
  type: string;
  payload: DeleteProcessProps;
  contextDispatch: (action: any) => any;
}
/** === SUCCESS === */
export interface DeleteSuccessAction {
  type: string;
  payload: DeleteSuccessProps;
}
/** === FAILED === */
export interface DeleteFailedAction {
  type: string;
  payload: ErrorProps;
}
