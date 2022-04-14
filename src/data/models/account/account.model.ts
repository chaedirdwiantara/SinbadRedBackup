interface ICoachmark {
  homeCoachmark: boolean;
  orderCoachmark: boolean;
  helpCoachmark: boolean;
  profileCoachmark: boolean;
}

export interface ICoachmarkData {
  data: ICoachmark;
}

export type ICoachmarkAction =
  | 'homeCoachmark'
  | 'orderCoachmark'
  | 'helpCoachmark'
  | 'profileCoachmark';

export interface ISearchLocationsData {
  id: string;
  province: string;
  city: string;
  district: string;
  urban: string;
  zipCode: number;
}

export interface IBuyerCategory {
  id: number;
  name: string;
  slug: string;
  description: string[];
  createdAt: string;
  updatedAt: string;
}

interface IMeta {
  total: number;
  limit: number;
  skip: number;
}
export interface IBuyerCategoryData {
  data: IBuyerCategory[];
  meta: IMeta;
}

export interface IProductCategory {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
}
export interface IProductCategoryData {
  data: IProductCategory[];
}

export interface ICreateBasicAccount {
  locationId: string;
  buyerCategoryId: number;
  productCategoryIds: string[];
}

export interface ICreateBasicAccountData {
  data: {
    id: number;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export interface ISearchLocation {
  keyword: string;
  page: number;
  perPage: number;
}

interface IUserCompleteStatus {
  isFullName: boolean;
  isIdImageUrl: boolean;
  isTaxImageUrl: boolean;
  isSelfieImageUrl: boolean;
  isValidIdNumber: boolean;
  isEmail: boolean;
}

interface IBuyerCompleteStatus {
  isBuyerInformation: boolean;
  isImageUrl: boolean;
  isAddress: boolean;
}

interface IUserCompleteData {
  fullName: string;
  idImageUrl: string;
  taxImageUrl: string;
  selfieImageUrl: string;
  idNo: string;
  taxNo: string;
  email: string;
}

interface IVehicleAccessibility {
  id: null;
  name: null;
}
interface IBuyerCompleteData {
  buyerCode: string;
  buyerName: string;
  buyerPhoneNo: string;
  imageUrl: string;
  address: string;
  noteAddress: string;
  vehicleAccessibility: IVehicleAccessibility;
  vehicleAccessibilityAmount: number;
  latitude: number;
  longitude: number;
}

interface IProgress {
  completed: number;
  total: number;
}
export interface ICompleteData {
  user: IUserCompleteStatus;
  buyer: IBuyerCompleteStatus;
  userData: IUserCompleteData;
  buyerData: IBuyerCompleteData;
  accountType: string;
  isDataCompleted: boolean;
  buyerProgress: IProgress;
  userProgress: IProgress;
}

export interface IReducer<T> {
  data: T | null;
  loading: boolean;
  error: any;
}

export interface IUpdateUserCompletData {
  name?: string;
  idImageUrl?: string;
  taxImageUrl?: string;
  selfieImageUrl?: string;
  idNo?: string;
  taxNo?: string;
  email?: string;
}

export interface IUpdateBuyerCompleteData {
  name?: string;
  phoneNo?: string;
  imageUrl?: string;
  address?: string;
  noteAddress?: string;
  vehicleAccessibilityId?: number;
  vehicleAccessibilityAmount?: number;
  latitude?: number;
  longitude?: number;
  locationId?: string;
}

export interface IUpdateCompleteData {
  user?: IUpdateUserCompletData;
  buyer?: IUpdateBuyerCompleteData;
}

export type ITypeList =
  | ''
  | 'listNumOfEmployee'
  | 'listProvince'
  | 'listCity'
  | 'listDistrict'
  | 'listUrban'
  | 'listVehicleAccessAmount'
  | 'listUrbanID'
  | 'listVehicleAccess'
  | 'listBank';

export interface IUploadSecureImage {
  data: {
    id: string;
    filename: string;
    urlFile: string;
  };
}

export interface IOCRImage {
  imageUrl: string;
  type: string;
}
