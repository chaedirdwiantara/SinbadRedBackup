/** === IMPORT EXTERNAL MODEL === */
import {
  LoginUserName,
  LoginSuccess,
  LogoutSuccess,
  OtpRequest,
  OtpGetSuccess,
  LoginPhoneNumber,
} from './auth.model';
import { ErrorProps } from '@models';
/** === LOGIN WITH USERNAME === */
/** => process */
export interface LoginUserNameProcessAction {
  type: string;
  payload: LoginUserName;
}
/** => success */
export interface LoginUserNameSuccessAction {
  type: string;
  payload: LoginSuccess;
}
/** => failed */
export interface LoginUserNameFailedAction {
  type: string;
  payload: ErrorProps;
}
/** === REQUEST OTP === */
/** => process */
export interface RequestOTPProcessAction {
  type: string;
  payload: OtpRequest;
}
/** => success */
export interface RequestOTPSuccessAction {
  type: string;
  payload: OtpGetSuccess;
}
/** => failed */
export interface RequestOTPFailedAction {
  type: string;
  payload: ErrorProps;
}
/** === VERIFICATION OTP === */
/** => process */
export interface VerificationOTPProcessAction {
  type: string;
  payload: LoginPhoneNumber;
}
/** => success */
export interface VerificationOTPSuccessAction {
  type: string;
  payload: LoginSuccess;
}
/** => failed */
export interface VerificationOTPFailedAction {
  type: string;
  payload: ErrorProps;
}
/** === ME === */
/** => process */
export interface MeProcessAction {
  type: string;
}
/** => success */
export interface MeSuccessAction {
  type: string;
  payload: LoginSuccess;
}
/** => failed */
export interface MeFailedAction {
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
  payload: LogoutSuccess;
}
/** => failed */
export interface LogoutFailedAction {
  type: string;
  payload: ErrorProps;
}
