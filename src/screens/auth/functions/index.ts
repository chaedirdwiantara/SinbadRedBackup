import {
  renderIF,
  formatter,
  maskPhone,
  extractAddress,
  setErrorMessage,
} from './auth-utils.functions';
import {
  useCheckPhoneNoAvailability,
  useRegister,
  useCheckPhoneV2,
  useCheckAutoLogin,
  useCheckPhoneRegistrationV3,
} from './register-hooks.functions';
import {
  useMerchant,
  useInputPhone,
  useInput,
  useInputFormat,
  useCamera,
  useTextFieldSelect,
} from './global-hooks.functions';
import useOTP from './otp-hooks.functions';

export {
  renderIF,
  formatter,
  useCamera,
  useTextFieldSelect,
  useCheckPhoneNoAvailability,
  useMerchant,
  useInputPhone,
  useInput,
  useInputFormat,
  maskPhone,
  useOTP,
  extractAddress,
  useRegister,
  setErrorMessage,
  useCheckPhoneV2,
  useCheckAutoLogin,
  useCheckPhoneRegistrationV3,
};
