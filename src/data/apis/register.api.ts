import apiAuth from '@core/services/apiAuth';
import * as models from '@models';
import apiMock from '@core/services/apiMock';

const checkPhoneNoAvailability = (
  data: models.ICheckPhoneNoAvailabilityProcess,
) => {
  const path = `check-owner-phone?mobilePhone=${data.mobilePhoneNo}`;
  return apiAuth(path, 'v1', 'GET');
};

const checkEmailAvailability = (
  data: models.ICheckEmailAvailabilityProcess,
) => {
  const path = `check-owner-email?email=${data.email}`;
  return apiAuth(path, 'v1', 'GET');
};

const registerMerchant = (data: models.IMerchantData) => {
  const path = 'registration';
  return apiAuth(path, 'v1', 'POST', data);
};

const verifyOTPRegister = (data: models.IVerifyOTPRegister) => {
  const path = 'verified-otp';
  const mockHost = 'https://7a55376b-ace5-4ee5-a6be-590d732e725d.mock.pstmn.io';
  return apiMock(mockHost, path, '', 'v2', 'POST', data);
};

const registermerchantDetail = (data: models.IRegisterMerchantSuccess) => {
  const path = `registration/check-self-registration/${data.data.requestId}`;
  return apiAuth(path, 'v1', 'GET');
};

const checkPhoneV2 = (data: models.ICheckPhoneV2Process) => {
  const path = 'check-phone';
  const mockHost = 'https://7a55376b-ace5-4ee5-a6be-590d732e725d.mock.pstmn.io';
  return apiMock(mockHost, path, '', 'v2', 'POST', data);
};

const checkAutoLogin = (data: models.ICheckAutoLoginProcess) => {
  console.log('data send:', data);
  const path = `check-registration?id=${data.data.requestId}`;
  const mockHost = 'https://7a55376b-ace5-4ee5-a6be-590d732e725d.mock.pstmn.io';
  return apiMock(mockHost, path, '', 'v2', 'GET');
};

export const registerApi = {
  checkPhoneNoAvailability,
  registerMerchant,
  checkEmailAvailability,
  verifyOTPRegister,
  registermerchantDetail,
  checkPhoneV2,
  checkAutoLogin,
};
