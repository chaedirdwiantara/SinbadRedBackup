/** === IMPORT EXTERNAL MODEL === */
import {
  LoginUserNameProps,
  LoginSuccessProps,
  LogoutSuccesProps,
} from './auth.model';
import { ErrorProps } from '@models';
/** === LOGIN WITH USERNAME === */
/** => process */
export interface LoginUserNameProcessAction {
  type: string;
  payload: LoginUserNameProps;
}
/** => success */
export interface LoginUserNameSuccessAction {
  type: string;
  payload: LoginSuccessProps;
}
/** => failed */
export interface LoginUserNameFailedAction {
  type: string;
  payload: ErrorProps;
}
/** === LOGOUT === */
/** => process */
export interface LogoutProcessAction {
  type: string;
}
/** => success */
export interface LogoutSuccessAction {
  type: string;
  payload: LogoutSuccesProps;
}
/** => failed */
export interface LogoutFailedAction {
  type: string;
  payload: ErrorProps;
}
