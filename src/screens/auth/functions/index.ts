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
import { useAuthAction } from './auth-hook.function';

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
  useAuthAction,
  extractAddress,
  useRegister,
  setErrorMessage,
  useCheckPhoneV2,
};
