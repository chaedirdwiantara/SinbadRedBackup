import * as types from '@types';
import * as models from '@models';
/** EXTERNAL FUNCTION */
import { setUserFCM } from '../../../functions/firebase/fcm-firestore.function';
import { globalReportFromAction } from '@report/global-report';
import * as EventName from '@report/moengage/event';
/** === LOGIN WITH USERNAME === */
/** => process */
export const loginUserNameProcess = (
  data: models.LoginUserName,
): models.LoginUserNameProcessAction => {
  return { type: types.LOGIN_USERNAME_PROCESS, payload: data };
};
/** => success */
export const loginUserNameSuccess = (
  data: models.LoginSuccess,
): models.LoginUserNameSuccessAction => {
  setUserFCM(data.data.user.id);
  return { type: types.LOGIN_USERNAME_SUCCESS, payload: data };
};
/** => failed */
export const loginUserNameFailed = (
  data: models.ErrorProps,
): models.LoginUserNameFailedAction => {
  return { type: types.LOGIN_USERNAME_FAILED, payload: data };
};
/** => reset */
export const loginUserNameReset = () => {
  return { type: types.LOGIN_USERNAME_RESET };
};
/** === REQUEST OTP === */
/** => process */
export const requestOTPProcess = (
  data: models.OtpRequest,
): models.RequestOTPProcessAction => {
  return { type: types.REQUEST_OTP_PROCESS, payload: data };
};
/** => success */
export const requestOTPSuccess = (
  data: models.OtpGetSuccess,
): models.RequestOTPSuccessAction => {
  return { type: types.REQUEST_OTP_SUCCESS, payload: data };
};
/** => failed */
export const requestOTPFailed = (
  data: models.ErrorProps,
): models.RequestOTPFailedAction => {
  return { type: types.REQUEST_OTP_FAILED, payload: data };
};
/** => reset */
export const requestOTPReset = () => {
  return { type: types.REQUEST_OTP_RESET };
};
/** === VERIFICATION OTP === */
/** => process */
export const verificationOTPProcess = (
  data: models.LoginPhoneNumber,
): models.VerificationOTPProcessAction => {
  return { type: types.VERIFICATION_OTP_PROCESS, payload: data };
};
/** => success */
export const verificationOTPSuccess = (
  data: models.LoginSuccess,
  params: any,
): models.VerificationOTPSuccessAction => {
  const recordData = {
    userId: data.data.user.id,
    userName: data.data.user.name,
    mobilePhone: params.mobilePhone,
  };
  globalReportFromAction(EventName.LOGIN, recordData);
  setUserFCM(data.data.user.id);
  return { type: types.VERIFICATION_OTP_SUCCESS, payload: data };
};
/** => failed */
export const verificationOTPFailed = (
  data: models.ErrorProps,
): models.VerificationOTPFailedAction => {
  return { type: types.VERIFICATION_OTP_FAILED, payload: data };
};
/** => reset */
export const verificationOTPReset = () => {
  return { type: types.VERIFICATION_OTP_RESET };
};
/** === VERIFICATION OTP === */
/** => process */
export const meProcess = (): models.MeProcessAction => {
  return { type: types.ME_PROCESS };
};
/** => success */
export const meSuccess = (
  data: models.LoginSuccess,
): models.MeSuccessAction => {
  return { type: types.ME_SUCCESS, payload: data };
};
/** => failed */
export const meFailed = (data: models.ErrorProps): models.MeFailedAction => {
  return { type: types.ME_FAILED, payload: data };
};
/** => reset */
export const meReset = () => {
  return { type: types.ME_RESET };
};
/** === LOGOUT === */
/** => process */
export const logoutProcess = (): models.LogoutProcessAction => {
  return { type: types.LOGOUT_PROCESS };
};
/** => success */
export const logoutSuccess = (
  data: models.LogoutSuccess,
): models.LogoutSuccessAction => {
  setUserFCM(null);
  return { type: types.LOGOUT_SUCCESS, payload: data };
};
/** => failed */
export const logoutFailed = (
  data: models.ErrorProps,
): models.LogoutFailedAction => {
  return { type: types.LOGOUT_FAILED, payload: data };
};
/** => reset */
export const logoutReset = () => {
  return { type: types.LOGOUT_RESET };
};
/** === ME 2 === */
/** => process */
export const meV2Process = (): models.MeProcessAction => {
  return { type: types.ME_V2_PROCESS };
};
/** => success */
export const meV2Success = (
  data: models.LoginSuccess,
): models.MeSuccessAction => {
  return { type: types.ME_V2_SUCCESS, payload: data };
};
/** => failed */
export const meV2Failed = (data: models.ErrorProps): models.MeFailedAction => {
  return { type: types.ME_V2_FAILED, payload: data };
};
/** => reset */
export const meV2Reset = () => {
  return { type: types.ME_V2_RESET };
};
/** === CHECK PHONE === */
/** PROCESS */
export const checkPhoneLogin = (
  data: models.ICheckPhoneLogin
): models.IAction<any> => {
  return { type: types.CHECK_PHONE_LOGIN_PROCESS, payload: data }
}
/** PROCESS */
export const checkPhoneLoginSuccess = (
  data: models.ICheckPhoneLoginSuccess
): models.IAction<models.ICheckPhoneLoginSuccess> => {
  return { type: types.CHECK_PHONE_LOGIN_SUCCESS, payload: data }
}
/** FAILED */
export const checkPhoneLoginFailed = (
  data: models.ErrorProps
): models.IAction<any> => {
  return { type: types.CHECK_PHONE_LOGIN_FAILED, payload: data }
}
/** RESET */
export const checkPhoneLoginReset = () => {
  return { type: types.CHECK_PHONE_LOGIN_RESET }
}
/** === SAVE ADS ID === */
export const saveAdsID = (data: string): models.SaveAdsIDAction => {
  return { type: types.SAVE_ADS_ID, payload: data };
};
