/** === LOGIN WITH USERNAME === */
export interface LoginUserNameProps {
  username: string;
  password: string;
}
/** === LOGIN WITH PHONENUMBER === */
export interface LoginPhoneNumberProps {
  mobilePhone: string;
  code: string;
}
/** === REQUEST OTP === */
export interface OtpRequestProps {
  mobilePhone: string;
}
/** === OTP DATA === */
export interface OtpData {
  message: string;
}
/** === SUCCESS GET OTP === */
export interface OtpGetSuccessProps {
  data: OtpData;
}
/** === USER AUTH DATA === */
export interface UserAuthDataProps {
  id: number;
  name: string | null;
  imageUrl: string | null;
}
/** === AUTH DATA === */
export interface AuthDataProps {
  sessionActiveUntil: Date;
  sessionExpiredUntil: Date;
  user: UserAuthDataProps;
}
/** === THIS FOR SUCCESS FETCH DATA === */
export interface LoginSuccessProps {
  data: AuthDataProps;
}
/** === LOGOUT SUCCESS === */
export interface LogoutSuccesProps {
  message: string;
}
