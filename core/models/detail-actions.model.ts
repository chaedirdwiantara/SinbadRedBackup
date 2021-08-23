/** === IMPORT EXTERNAL MODEL === */
import { DetailProcessProps, DetailSuccessProps } from './detail.model';
import { ErrorProps } from './error.model';
/** === PROCESS === */
export interface DetailProcessAction {
  type: string;
  payload: DetailProcessProps;
  contextDispatch: (action: any) => any;
}
/** === SUCCESS === */
export interface DetailSuccessAction<T> {
  type: string;
  payload: DetailSuccessProps<T>;
}
/** === FAILED === */
export interface DetailFailedAction {
  type: string;
  payload: ErrorProps;
}
