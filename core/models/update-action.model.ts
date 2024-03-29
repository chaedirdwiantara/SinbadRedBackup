/** === IMPORT EXTERNAL MODEL === */
import {
  UpdateSuccessProps,
  UpdateSuccessV2Props,
  UpdateSuccessV3Props,
  UpdateProcessProps,
} from './update.model';
import { ErrorProps } from './error.model';
/** === PROCESS === */
export interface UpdateProcessAction<T> {
  type: string;
  payload: UpdateProcessProps<T>;
  contextDispatch: (action: any) => any;
}
/** === FAILED === */
export interface UpdateFailedAction {
  type: string;
  payload: ErrorProps;
}
/** === SUCCESS VERSION 1 === */
export interface UpdateSuccessAction {
  type: string;
  payload: UpdateSuccessProps;
}
/** === SUCCESS VERSION 2 === */
export interface UpdateSuccessV2Action {
  type: string;
  payload: UpdateSuccessV2Props;
}
/** === SUCCESS VERSION 3 === */
export interface UpdateSuccessV3Action<T> {
  type: string;
  payload: UpdateSuccessV3Props<T>;
}
