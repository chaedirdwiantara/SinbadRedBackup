/** === IMPORT EXTERNAL MODEL === */
import {
  CreateSuccessProps,
  CreateSuccessV2Props,
  CreateSuccessV3Props,
  CreateProcessProps,
} from './create.model';
import { ErrorProps } from './error.model';
/** === PROCESS === */
export interface CreateProcessAction<T> {
  type: string;
  payload: CreateProcessProps<T>;
  contextDispatch: (action: any) => any;
}
/** === FAILED === */
export interface CreateFailedAction {
  type: string;
  payload: ErrorProps;
}
/** === SUCCESS VERSION 1 === */
export interface CreateSuccessAction {
  type: string;
  payload: CreateSuccessProps;
}
/** === SUCCESS VERSION 2 === */
export interface CreateSuccessV2Action {
  type: string;
  payload: CreateSuccessV2Props;
}
/** === SUCCESS VERSION 3 === */
export interface CreateSuccessV3Action<T> {
  type: string;
  payload: CreateSuccessV3Props<T>;
}
