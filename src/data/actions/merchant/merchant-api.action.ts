import * as types from '@types';
import * as models from '@models';
import ReactMoE from 'react-native-moengage';
import { globalReportFromAction } from '@core/report/global-report';
import * as EventName from '@core/report/moengage/event';
/** === MERCHANT EDIT === */
/** => process */
export const merchantEditProcess = (
  contextDispatch: (action: any) => any,
  data: models.UpdateProcessProps<{}>,
): models.UpdateProcessAction => {
  contextDispatch({
    type: types.MERCHANT_EDIT_PROCESS,
    payload: data,
  });
  return {
    type: types.MERCHANT_EDIT_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const merchantEditSuccess = (
  data: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.MERCHANT_EDIT_SUCCESS, payload: data };
};
/** => failed */
export const merchantEditFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.MERCHANT_EDIT_FAILED, payload: data };
};
/** => merchant edit reset */
export const merchantEditReset = () => {
  return { type: types.MERCHANT_EDIT_RESET };
};
/** === PROFILE ACCOUNT EDIT === */
/** => process */
export const profileEditProcess = (
  contextDispatch: (action: any) => any,
  data: models.UpdateProcessProps<{}>,
): models.UpdateProcessAction => {
  contextDispatch({
    type: types.PROFILE_EDIT_PROCESS,
    payload: data,
  });
  return {
    type: types.PROFILE_EDIT_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const profileEditSuccess = (
  data: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.PROFILE_EDIT_SUCCESS, payload: data };
};
/** => failed */
export const profileEditFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.PROFILE_EDIT_FAILED, payload: data };
};
/** => profile edit reset */
export const profileEditReset = () => {
  return { type: types.PROFILE_EDIT_RESET };
};
/** === CHANGE EMAIL === */
/** => process */
export const changeEmailProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.CHANGE_EMAIL_PROCESS,
    payload: data,
  });
  return {
    type: types.CHANGE_EMAIL_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const changeEmailSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.CHANGE_EMAIL_SUCCESS, payload: data };
};
/** => failed */
export const changeEmailFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CHANGE_EMAIL_FAILED, payload: data };
};
/** => reset */
export const changeEmailReset = () => {
  return { type: types.CHANGE_EMAIL_RESET };
};
/** === VERIFICATION EMAIL === */
/** => process */
export const verificationEmailProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.VERIFICATION_EMAIL_PROCESS,
    payload: data,
  });
  return {
    type: types.VERIFICATION_EMAIL_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const verificationEmailSuccess = (
  data: models.CreateSuccessProps,
  params: any,
): models.CreateSuccessAction => {
  ReactMoE.setUserEmailID(params.email);
  const dataUser = {
    email: params.email,
  };
  if (params.screen === 'completion') {
    globalReportFromAction(EventName.OWNER_DATA_STEP_4, { dataUser });
  }
  return { type: types.VERIFICATION_EMAIL_SUCCESS, payload: data };
};
/** => failed */
export const verificationEmailFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.VERIFICATION_EMAIL_FAILED, payload: data };
};
/** => reset */
export const verificationEmailReset = () => {
  return { type: types.VERIFICATION_EMAIL_RESET };
};
/** === CHANGE MOBILE PHONE === */
/** => process */
export const changeMobilePhoneProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.CHANGE_MOBILE_PHONE_PROCESS,
    payload: data,
  });
  return {
    type: types.CHANGE_MOBILE_PHONE_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const changeMobilePhoneSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.CHANGE_MOBILE_PHONE_SUCCESS, payload: data };
};
/** => failed */
export const changeMobilePhoneFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CHANGE_MOBILE_PHONE_FAILED, payload: data };
};
/** => reset */
export const changeMobilePhoneReset = () => {
  return { type: types.CHANGE_MOBILE_PHONE_RESET };
};
/** === VERIFICATION MOBILE PHONE === */
/** => process */
export const verificationMobilePhoneProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.VERIFICATION_MOBILE_PHONE_PROCESS,
    payload: data,
  });
  return {
    type: types.VERIFICATION_MOBILE_PHONE_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const verificationMobilePhoneSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.VERIFICATION_MOBILE_PHONE_SUCCESS, payload: data };
};
/** => failed */
export const verificationMobilePhoneFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.VERIFICATION_MOBILE_PHONE_FAILED, payload: data };
};
/** => reset */
export const verificationMobilePhoneReset = () => {
  return { type: types.VERIFICATION_MOBILE_PHONE_RESET };
};
/** === CHANGE BANK ACCOUNT === */
/** => process */
export const changeBankAccountProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.CHANGE_BANK_ACCOUNT_PROCESS,
    payload: data,
  });
  return {
    type: types.CHANGE_BANK_ACCOUNT_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const changeBankAccountSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.CHANGE_BANK_ACCOUNT_SUCCESS, payload: data };
};
/** => failed */
export const changeBankAccountFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CHANGE_BANK_ACCOUNT_FAILED, payload: data };
};
/** => reset */
export const changeBankAccountReset = () => {
  return { type: types.CHANGE_BANK_ACCOUNT_RESET };
};
/** === VERIFICATION BANK ACCOUNT === */
/** => process */
export const verificationBankAccountProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.VERIFICATION_BANK_ACCOUNT_PROCESS,
    payload: data,
  });
  return {
    type: types.VERIFICATION_BANK_ACCOUNT_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const verificationBankAccountSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.VERIFICATION_BANK_ACCOUNT_SUCCESS, payload: data };
};
/** => failed */
export const verificationBankAccountFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.VERIFICATION_BANK_ACCOUNT_FAILED, payload: data };
};
/** => reset */
export const verificationBankAccountReset = () => {
  return { type: types.VERIFICATION_BANK_ACCOUNT_RESET };
};
