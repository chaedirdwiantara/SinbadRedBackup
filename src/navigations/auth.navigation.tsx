import {
  LoginOTPView,
  LoginPhoneView,
  RegisterOTPView,
  OnBoardingView,
  SelfRegisterView,
} from '@screen/auth/views';

const AuthNav = {
  OnBoardingView: {
    component: OnBoardingView,
  },
  LoginPhoneView: {
    component: LoginPhoneView,
  },
  LoginOTPView: {
    component: LoginOTPView,
  },
  RegisterOTPView: {
    component: RegisterOTPView,
  },
  SelfRegisterView: {
    component: SelfRegisterView,
  },
};

export default AuthNav;
