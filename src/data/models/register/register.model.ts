interface User {
  name: string;
  mobilePhone: string;
  email: string;
  username: string;
  idNo: string;
  taxNo: string;
  imageUrl: string;
  taxImageUrl: string;
  idImageUrl: string;
  selfieImageUrl: string;
}

export interface IRegisterAction<T> {
  type: string;
  payload: T;
}

// PARAM MODEL
export interface ICheckPhoneNoAvailabilityProcess {
  mobilePhoneNo: string;
}

export interface IRegisterMerchantProcess {
  urbanId: number;
  topSellingBrand: string;
  mostWantedBrand: string;
  vehicleAccessibilityId: number;
  name: string;
  address: string;
  noteAddress: string;
  taxNo: string;
  longitude: number;
  latitude: number;
  largeArea: string;
  phoneNo: string;
  imageUrl: string;
  taxImageUrl: string;
  numberOfEmployee: string;
  vehicleAccessibilityAmount: number;
  user: User;
}

// SUCCESS MODEL
export interface ICheckPhoneNoAvailabilitySuccess {
  data: {
    message: string;
    exist: boolean;
    otp: string;
  };
}
export interface IRegisterMerchantSuccess {
  data: {
    message: string;
  };
}

// FAILED MODEL
export interface ICheckPhoneNoAvailabilityFailed {}
export interface IRegisterMerchantFailed {}
