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
  imageUrl: string | null;
  name: string;
  email: string;
  mobilePhone: string;
  idNo: string | null;
  taxNo: string | null;
  taxImageUrl: string | null;
  idImageUrl: string | null;
  selfieImageUrl: string | null;
  bankAccount: IBankAccount | null;
}

interface IInfo {
  isMobilePhoneVerified: boolean;
  isEmailVerified: boolean;
  isBankAccountVerified: boolean;
}
interface IStoreData {
  storeInformation: IStoreInformation;
  storeAddress: IStoreAddress;
}

interface IBankAccount {
  bankId: number | null;
  bankName: string | null;
  bankBranchName: string | null;
  bankAccountName: string | null;
  bankAccountNo: string | null;
}

interface IStoreInformation {
  storeAccount: IStoreAccount;
  storeDetailCompleteness: IStoreDetailCompleteness;
}
interface IStoreAddress {
  latitude: number;
  longitude: number;
  province: string | null;
  city: string | null;
  district: string | null;
  urban: string | null;
  zipCode: string | null;
  address: string | null;
  noteAddress: string | null;
}
interface IStoreAccount {
  code: string;
  name: string;
  phoneNo: string | null;
  imageUrl: string | null;
}
interface IStoreDetailCompleteness {
  numberOfEmployee: string | null;
  largeArea: string | null;
  topSellingBrand: string | null;
  mostWantedBrand: string | null;
  vehicleAccessibility: IVehicleAccessibility | null;
  vehicleAccessibilityAmount: number;
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
