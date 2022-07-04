export interface User {
  name?: string;
  mobilePhone?: string;
  email?: string;
  idNo?: string;
  taxNo?: string;
  taxImageUrl?: string;
  idImageUrl?: string;
  selfieImageUrl?: string;
}

export interface IRegisterAction<T> {
  type: string;
  payload: T;
}

// PARAM MODEL
export interface ICheckPhoneNoAvailabilityProcess {
  mobilePhoneNo: string | undefined;
}
export interface ICheckEmailAvailabilityProcess {
  email: string | undefined;
}

export interface IStep1Data {
  name: string;
  idNumber: string;
  taxNumber?: string;
  email?: string;
}

export interface IMerchantData {
  urbanId?: number | null;
  topSellingBrand?: string;
  mostWantedBrand?: string;
  vehicleAccessibilityId?: number | null;
  name?: string;
  address?: string;
  noteAddress?: string;
  longitude?: number | null;
  latitude?: number | null;
  largeArea?: string;
  imageUrl?: string;
  numberOfEmployee?: string;
  vehicleAccessibilityAmount?: number | null;
  user?: User;
}

export interface IRegisterMerchantSuccess {
  data: {
    requestId: string;
    message: string;
  };
}

export interface IRegisterMerchantDetail {
  data: {
    status: string;
    isCreated: boolean;
    errors: any[];
  };
}

// SUCCESS MODEL
export interface ICheckEmailAvailabilitySuccess { }
export interface ICheckPhoneNoAvailabilitySuccess {
  data: {
    message: string;
    exist: boolean;
    otp: string;
  };
}

export interface IVerifyOTPRegister {
  mobilePhoneNo: string | undefined;
  otp: number;
}

export interface ISendOTP {
  mobilePhone: string,
  type: 'sms' | 'wa'
  otpHash?: string,
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

// FAILED MODEL
export interface ICheckPhoneNoAvailabilityFailed { }
export interface IRegisterMerchantFailed { }
export interface ICheckEmailAvailabilityFailed { }
export interface ICheckAutoLoginFailed { }
