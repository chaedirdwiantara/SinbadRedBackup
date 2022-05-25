import apiAuth from '@core/services/apiAuth';
import * as models from '@models';

const checkEmailAvailability = (
  data: models.ICheckEmailAvailabilityProcess,
) => {
  const path = `check-owner-email?email=${data.email}`;
  return apiAuth(path, 'v1', 'GET');
};

const verifyOTPRegister = (data: models.IVerifyOTPRegister) => {
  const path = 'validate-otp';
  return apiAuth(path, 'v2', 'POST', data);
};

const checkPhoneV2 = (data: models.ICheckPhoneV2Process) => {
  const path = 'check-phone';
  return apiAuth(path, 'v2', 'POST', data);
};

const checkAutoLogin = (data: models.ICheckAutoLoginProcess) => {
  const path = `check-registration?id=${data.data.requestId}`;
  return apiAuth(path, 'v2', 'GET');
};

export const registerApi = {
  checkEmailAvailability,
  verifyOTPRegister,
  checkPhoneV2,
  checkAutoLogin,
};
