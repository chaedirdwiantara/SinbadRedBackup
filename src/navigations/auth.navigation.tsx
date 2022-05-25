import {
  LoginOTPView,
  LoginPhoneView,
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
  SelfRegisterView: {
    component: SelfRegisterView,
  },
};

export default AuthNav;
