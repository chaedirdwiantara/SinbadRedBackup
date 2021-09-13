/** === STORE DETAIL === */
export interface StoreDetail {
  ownerData: IOwnerData;
  storeData: IStoreData;
}

interface IOwnerData {
  profile: IOwnerProfile;
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
  vehicleAccessibility?: string;
  vehicleAccessibilityAmount?: number;
}
