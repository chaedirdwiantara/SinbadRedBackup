import useLogin from './login-hooks.functions';
import {
  renderIF,
  formatter,
  handleMessageError,
  maskPhone,
} from './auth-utils.functions';
import {
  useCheckPhoneNoAvailability,
  useRegister,
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
  useLogin,
  renderIF,
  formatter,
  useCamera,
  useTextFieldSelect,
  useCheckPhoneNoAvailability,
  useRegister,
  useInputPhone,
  useInput,
  useInputFormat,
  handleMessageError,
  maskPhone,
  useOTP,
};
