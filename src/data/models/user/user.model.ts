/** === STORE DETAIL === */
export interface StoreDetail {
  ownerData: IOwnerData;
  buyerData: IBuyerData;
  progress: IProgress;
  vipStatus: 'review' | 'reject' | 'accept' | 'none';
}
interface IOwnerData {
  profile: IOwnerProfile;
  info: IInfo;
  accountType: 'basic' | 'vip';
}
interface IOwnerProfile {
  imageId: string | null;
  imageUrl: string | null;
  name: string;
  email: string;
  mobilePhone: string;
  idNo: string | null;
  taxNo: string | null;
  taxImageUrl: string | null;
  selfieImageUrl: string | null;
  bankAccount: IBankAccount | null;
}

interface IInfo {
  isMobilePhoneVerified: boolean;
  isEmailVerified: boolean;
  isBankAccountVerified: boolean;
  isImageIdOcrValidate: boolean;
}
export interface IBuyerData {
  buyerInformation: IBuyerInformation;
  buyerAddress: IBuyerAddress;
}

interface IBankAccount {
  bankId: number | null;
  bankName: string | null;
  bankBranchName: string | null;
  bankAccountName: string | null;
  bankAccountNo: string | null;
}

interface IBuyerInformation {
  buyerAccount: IBuyerAccount;
}
interface IBuyerAddress {
  latitude: number;
  longitude: number;
  zipCode: string | null;
  address: string | null;
  noteAddress: string | null;
  vehicleAccessibility: IVehicleAccessibility;
  vehicleAccessibilityAmount: number;
}
interface IBuyerAccount {
  code: string;
  name: string;
  phoneNo: string;
  imageUrl: string;
  buyerCategory: string;
  productCategory: string;
  largeArea: string;
}
interface IVehicleAccessibility {
  id: any;
  name: any;
}
interface IProgress {
  done: number;
  total: number;
  ownerProgress: IOwnerProgress;
  buyerProgress: IBuyerProgress;
}
interface IOwnerProgress {
  done: number;
  total: number;
}
interface IBuyerProgress {
  done: number;
  total: number;
}
