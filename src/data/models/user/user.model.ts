/** === STORE DETAIL === */
export interface StoreDetail {
  ownerData: IOwnerData;
  storeData: IStoreData;
  progress: IProgress;
}
interface IOwnerData {
  profile: IOwnerProfile;
  info: IInfo;
}
interface IOwnerProfile {
  imageUrl?: string;
  name: string;
  email: string;
  mobilePhone: string;
  idNo?: string;
  taxNo?: string;
  taxImageUrl?: string;
  idImageUrl?: string;
  selfieImageUrl?: string;
  bankAccount: IBankAccount;
}
interface IInfo {
  isMobilePhoneVerified: boolean;
  isEmailVerified: boolean;
  isBankAccountVerified: boolean;
}
interface IBankAccount {
  bankId: number;
  bankName: string;
  bankAccountName: string;
  bankAccountNo: string;
  bankBranchName: string;
}
interface IStoreData {
  storeInformation: IStoreInformation;
  storeAddress: IStoreAddress;
}
interface IStoreInformation {
  storeAccount: IStoreAccount;
  storeDetailCompleteness: IStoreDetailCompleteness;
}
interface IStoreAddress {
  latitude: number;
  longitude: number;
  province: string;
  city: string;
  district: string;
  urban: string;
  zipCode: string;
  address: string;
  noteAddress?: string;
}
interface IStoreAccount {
  code: string;
  name: string;
  phoneNo?: string;
  imageUrl?: string;
}
interface IStoreDetailCompleteness {
  numberOfEmployee?: string;
  largeArea?: string;
  topSellingBrand?: string;
  mostWantedBrand?: string;
  vehicleAccessibility: any;
  vehicleAccessibilityAmount?: any;
}
interface IVehicleAccessibility {
  id: any;
  name: any;
}
interface IProgress {
  done: number;
  total: number;
  ownerProgress: IOwnerProgress;
  storeProgress: IStoreProgress;
}
interface IOwnerProgress {
  done: number;
  total: number;
}
interface IStoreProgress {
  done: number;
  total: number;
}
