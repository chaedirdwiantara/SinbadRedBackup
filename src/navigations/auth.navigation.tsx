import {
  LoginOTPView,
  LoginPhoneView,
  OnBoardingView,
  RegisterOTPView,
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
  SelfRegisterView: {
    component: SelfRegisterView,
  },
  RegisterOTPView: {
    component: RegisterOTPView,
  },
};

export default AuthNav;
