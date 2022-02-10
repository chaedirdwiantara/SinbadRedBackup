/** === IMPORT EXTERNAL MODEL === */
import {
  DeleteSuccessProps,
  DeleteSuccessV3Props,
  DeleteProcessProps,
} from './delete.model';
import { ErrorProps } from './error.model';
/** === PROCESS === */
export interface DeleteProcessAction {
  type: string;
  payload: DeleteProcessProps;
  contextDispatch: (action: any) => any;
}
/** === SUCCESS VERSION 1 === */
export interface DeleteSuccessAction {
  type: string;
  payload: DeleteSuccessProps;
}
/** === SUCCESS VERSION 3 === */
export interface DeleteSuccessV3Action {
  type: string;
  payload: DeleteSuccessV3Props;
}
/** === FAILED === */
export interface DeleteFailedAction {
  type: string;
  payload: ErrorProps;
}
