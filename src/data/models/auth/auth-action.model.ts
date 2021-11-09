/** === IMPORT EXTERNAL MODEL === */
import {
  LoginUserNameProps,
  LoginSuccessProps,
  LogoutSuccesProps,
  OtpRequestProps,
  OtpGetSuccessProps,
  LoginPhoneNumberProps,
  AuthMeSuccessProps,
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
/** === REQUEST OTP === */
/** => process */
export interface RequestOTPProcessAction {
  type: string;
  payload: OtpRequestProps;
}
/** => success */
export interface RequestOTPSuccessAction {
  type: string;
  payload: OtpGetSuccessProps;
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
  payload: LoginPhoneNumberProps;
}
/** => success */
export interface VerificationOTPSuccessAction {
  type: string;
  payload: LoginSuccessProps;
}
/** => failed */
export interface VerificationOTPFailedAction {
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
/** === AUTH ME === */
/** process */
export interface AuthMeProcessAction {
  type: string;
}
/** => success */
export interface AuthMeSuccessAction {
  type: string;
  payload: AuthMeSuccessProps;
}
/** => failed */
export interface AuthMeFailedAction {
  type: string;
  payload: ErrorProps;
}
