import {
  BuyerCategoryView,
  ListLocationView,
  ProductCategoryView,
} from '@screen/account/views';
import {
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
  InputManualLocationView,
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
  InputManualLocationView: {
    component: InputManualLocationView,
  },
  SelfRegisterView: {
    component: SelfRegisterView,
  },
  ListLocationView: {
    component: ListLocationView,
  },
  BuyerCategoryView: {
    component: BuyerCategoryView,
  },
  ProductCategoryView: {
    component: ProductCategoryView,
  },
};

export default AuthNav;
