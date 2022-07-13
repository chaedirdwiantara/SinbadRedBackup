import apiAuth from '@core/services/apiAuth';
import * as models from '@models';
import apiGeneral from '@core/services/apiGeneral';

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
  const path = 'validate-otp';
  return apiAuth(path, 'v3', 'POST', data);
};

const registermerchantDetail = (data: models.IRegisterMerchantSuccess) => {
  const path = `registration/check-self-registration/${data.data.requestId}`;
  return apiAuth(path, 'v1', 'GET');
};

const checkPhoneV2 = (data: models.ICheckPhoneV2Process) => {
  const path = 'check-phone';
  return apiAuth(path, 'v2', 'POST', data);
};

const checkAutoLogin = (data: models.ICheckAutoLoginProcess) => {
  const path = `check-registration?id=${data.data.requestId}`;
  return apiAuth(path, 'v2', 'GET');
};

const checkPhoneRegistrationV3 = (data: models.ICheckPhoneV3Process) => {
  const path = 'registration/check-phone';
  return apiAuth(path, 'v3', 'POST', data);
};

const getUserMedea = () => {
  const path = 'user-medea';
  return apiGeneral<models.IUserMedea>('auth', path, 'auth', 'v1', 'GET');
};

const UpdateUserMedea = (data: models.IUpdateUserMedeaProcess) => {
  const path = 'user-medea/verify';
  return apiGeneral<models.IUpdateUserMedeaSuccess>(
    'auth',
    path,
    'account',
    'v1',
    'PATCH',
    data,
  );
};

export const registerApi = {
  checkPhoneNoAvailability,
  registerMerchant,
  checkEmailAvailability,
  verifyOTPRegister,
  registermerchantDetail,
  checkPhoneV2,
  checkAutoLogin,
  checkPhoneRegistrationV3,
  getUserMedea,
  UpdateUserMedea,
};
