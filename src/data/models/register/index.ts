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
  otp: string;
}

export interface ISendOTP {
  mobilePhone: string;
  type: 'sms' | 'wa';
  otpHash?: string;
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

export interface ICheckPhoneV3Process {
  mobilePhone: string | undefined;
  identifierDeviceId: string | undefined;
}

export interface ICheckPhoneV3Success {
  data: {
    phoneNumberAvailable: boolean;
    isUserMedea: boolean;
    isUserAgent: boolean;
  };
  message: string;
}

export interface IUserMedeaProcess {
  identifierDeviceId: string;
}
export interface IUserMedea {
  data: {
    ownerName: string;
    buyerName: string;
    idNo: string;
    ownerPhoneNumber: string;
    address: string;
  };
  message: string;
}

export interface IUpdateUserMedeaProcess {
  ownerName: string;
  buyerName: string;
  idNo: string;
  address: string;
  ownerPhoneNumber: string;
}

export interface IUpdateUserMedeaSuccess {
  data: {
    id: Number;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

// FAILED MODEL
export interface IUserMedeaFailed {}
export interface ICheckPhoneNoAvailabilityFailed {}
export interface IRegisterMerchantFailed {}
export interface ICheckEmailAvailabilityFailed {}
export interface ICheckAutoLoginFailed {}
