import apiAuth from '@core/services/apiAuth';
import * as models from '@models';

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
  const path = 'otp/verification/self-registration';
  return apiAuth(path, 'v1', 'POST', data);
};

const registermerchantDetail = (data: models.IRegisterMerchantSuccess) => {
  const path = `registration/check-self-registration/${data.data.requestId}`;
  return apiAuth(path, 'v1', 'GET');
};

export const registerApi = {
  checkPhoneNoAvailability,
  registerMerchant,
  checkEmailAvailability,
  verifyOTPRegister,
  registermerchantDetail,
};
