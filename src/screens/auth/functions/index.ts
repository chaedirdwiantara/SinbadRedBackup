import {
  renderIF,
  formatter,
  maskPhone,
  extractAddress,
  setErrorMessage,
} from './auth-utils.functions';
import {
  useCheckPhoneV2,
  useCheckAutoLogin,
  useCheckPhoneRegistrationV3,
} from './register-hooks.functions';
import {
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
  useInputPhone,
  useInput,
  useInputFormat,
  maskPhone,
  useOTP,
  extractAddress,
  setErrorMessage,
  useCheckPhoneV2,
  useCheckAutoLogin,
  useCheckPhoneRegistrationV3,
};
