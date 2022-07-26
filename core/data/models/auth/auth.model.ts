/** === LOGIN WITH USERNAME === */
export interface LoginUserName {
  username: string;
  password: string;
}
/** === LOGIN WITH PHONENUMBER === */
export interface LoginPhoneNumber {
  mobilePhone: string;
  otp: string;
}
/** === REQUEST OTP === */
export interface OtpRequest {
  mobilePhone: string;
  otpHash: string;
  type: 'sms' | 'wa' | string;
}
/** === OTP DATA === */
export interface OtpData {
  message: string;
}
/** ==> check phone login */
export interface ICheckPhoneLoginSuccess{
  message: string;
  data: {
    phoneNumberAvailable: boolean;
    isUserMedea: boolean;
    isUserAgent: boolean;
  }
}
/** === SUCCESS GET OTP === */
export interface OtpGetSuccess {
  data: OtpData;
}
/** === USER AUTH DATA === */
export interface UserAuthData {
  id: number;
  name: string | null;
  imageUrl: string | null;
}
/** === USER SELLER AUTH DATA === */
export interface UserSellerAuthData {
  id: number;
}
/** === AUTH DATA === */
export interface AuthData {
  sessionActiveUntil: Date;
  sessionExpiredUntil: Date;
  user: UserAuthData;
  sellerIds: UserSellerAuthData[];
}
/** === THIS FOR SUCCESS FETCH DATA === */
export interface LoginSuccess {
  data: AuthData;
}
/** === LOGOUT SUCCESS === */
export interface LogoutSuccess {
  message: string;
}

/** === AUTH ME DATA === */
export interface AuthMeDataProps {
  sessionActiveUntil: Date;
  sessionExpiredUntil: Date;
  user: UserAuthData;
  isActiveStore: boolean;
  approvalStatus: 'guest' | 'rejected' | 'verified' | 'pending' | 'updating';
  sellerIds: UserSellerAuthData[];
}

export interface AuthMeV2DataProps {
  data: {
    sessionActiveUntil: Date;
    sessionExpiredUntil: Date;
    user: UserAuthData;
    isBuyerCategoryCompleted: boolean;
    isDataCompleted: boolean;
    isRegisteredOnNG: boolean;
  };
}

export interface AuthMeSuccess {
  data: AuthMeDataProps;
}

//check phone login
export interface ICheckPhoneLogin {
  mobilePhone: string;
  identifierDeviceId: string | null;
}