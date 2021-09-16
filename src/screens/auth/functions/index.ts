import useLogin from './login-hooks.functions';
import {
  renderIF,
  formatter,
  handleMessageError,
} from './auth-utils.functions';
import {
  useCheckPhoneNoAvailability,
  useRegisterStep1,
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
} from './global-hooks.functions';

export {
  useLogin,
  renderIF,
  formatter,
  useCheckPhoneNoAvailability,
  useRegisterStep1,
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
};
