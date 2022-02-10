/** === IMPORT EXTERNAL MODEL === */
import {
  ListProcessProps,
  ListSuccessProps,
  ListProcessV2Props,
  ListSuccessV2Props,
  ListProcessV3Props,
  ListSuccessV3Props,
} from './list.model';
import { ErrorProps } from './error.model';
/** === PROCESS VERSION 1 === */
export interface ListProcessAction<T = object> {
  type: string;
  payload: ListProcessProps<T>;
  contextDispatch: (action: any) => any;
}
/** === PROCESS VERSION 2 === */
export interface ListProcessV2Action<T = object> {
  type: string;
  payload: ListProcessV2Props<T>;
  contextDispatch: (action: any) => any;
}
/** === PROCESS VERSION 3 === */
export interface ListProcessV3Action<T = object> {
  type: string;
  payload: ListProcessV3Props<T>;
  contextDispatch: (action: any) => any;
}
/** === SUCCESS VERSION 1 === */
export interface ListSuccessAction<T> {
  type: string;
  payload: ListSuccessProps<T>;
}
/** === SUCCESS VERSION 2 === */
export interface ListSuccessV2Action<T> {
  type: string;
  payload: ListSuccessV2Props<T>;
}
/** === SUCCESS VERSION 3 === */
export interface ListSuccessV3Action<T> {
  type: string;
  payload: ListSuccessV3Props<T>;
}
/** === FAILED === */
export interface ListFailedAction {
  type: string;
  payload: ErrorProps;
}
