import {
  LoginIDView,
  LoginOTPView,
  LoginPhoneView,
  RegisterOTPView,
  RegisterStep1View,
  RegisterStep2View,
  RegisterStep3View,
  RegisterStep4View,
  RegisterStep5View,
  RegisterStep6View,
  RegisterStep7View,
  RegisterView,
} from '@screen/auth/views';

const AuthNav = {
  LoginPhoneView: {
    component: LoginPhoneView,
  },
  LoginIDView: {
    component: LoginIDView,
  },
  LoginOTPView: {
    component: LoginOTPView,
  },
  RegisterView: {
    component: RegisterView,
  },
  RegisterOTPView: {
    component: RegisterOTPView,
  },
  RegisterStep1View: {
    component: RegisterStep1View,
  },
  RegisterStep2View: {
    component: RegisterStep2View,
  },
  RegisterStep3View: {
    component: RegisterStep3View,
  },
  RegisterStep4View: {
    component: RegisterStep4View,
  },
  RegisterStep5View: {
    component: RegisterStep5View,
  },
  RegisterStep6View: {
    component: RegisterStep6View,
  },
  RegisterStep7View: {
    component: RegisterStep7View,
  },
};

export default AuthNav;
