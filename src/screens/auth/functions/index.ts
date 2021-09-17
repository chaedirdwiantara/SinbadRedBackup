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
  useRegisterStep2,
  useRegisterStep3,
  useRegisterStep4,
  useRegisterStep5,
  useRegisterStep6,
  useRegisterStep7,
} from './register-hooks.functions';
import {
  useInputPhone,
  useInput,
  useInputFormat,
  useCamera,
} from './global-hooks.functions';

export {
  useLogin,
  renderIF,
  formatter,
  useCamera,
  useCheckPhoneNoAvailability,
  useRegister,
  useRegisterStep2,
  useRegisterStep3,
  useRegisterStep4,
  useRegisterStep5,
  useRegisterStep6,
  useRegisterStep7,
  useInputPhone,
  useInput,
  useInputFormat,
  handleMessageError,
  maskPhone,
};
