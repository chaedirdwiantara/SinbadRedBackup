export interface IRegisterAction<T> {
  type: string;
  payload: T;
}

export interface ICheckEmailAvailabilityProcess {
  email: string | undefined;
}

// SUCCESS MODEL
export interface ICheckEmailAvailabilitySuccess {}
export interface IVerifyOTPRegister {
  mobilePhoneNo: string | undefined;
  otp: number;
}
export interface IVerifyOTPSuccess {
  data: {
    sessionActiveUntil: string;
    sessionExpiredUntil: string;
    sellerIds: string[];
    user: {
      id: number;
    };
  };
}
export interface ICheckPhoneV2Process {
  mobilePhoneNo: string | undefined;
  otpHash: string;
}
export interface ICheckPhoneV2Success {
  data: {
    data: {
      id: number | null;
      isAvailable: boolean;
      createdAt: string;
      updatedAt: string;
    };
    message: string;
  };
}
export interface ICheckAutoLoginProcess {
  data: {
    requestId: string;
  };
}
export interface ICheckAutoLoginSuccess {
  data: {
    sessionActiveUntil: string;
    sessionExpiredUntil: string;
    user: {
      id: number;
      name: string;
      imageUrl: string;
    };
    isBuyerCategoryCompleted: boolean;
    isDataCompleted: boolean;
  };
}

// FAILED MODEL
export interface ICheckPhoneNoAvailabilityFailed {}
export interface IRegisterMerchantFailed {}
export interface ICheckEmailAvailabilityFailed {}
export interface ICheckAutoLoginFailed {}
