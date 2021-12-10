/** === IMPORT EXTERNAL MODEL === */
import { UploadImageSaveProps } from './global.model';
/** === UPLOAD IMAGE === */
export interface uploadImageAction {
  type: string;
  payload: UploadImageSaveProps;
  contextDispatch: (action: any) => any;
}
export interface IUploadImage {
  base64: string;
  currentFilePath: string | null | undefined;
}

export interface IUploadImageSuccess {
  data: {
    url: string;
  };
}

export interface INumOfEmployee {
  amount: string;
}
export interface IGetSelectionSuccess<T> {
  data: T[];
}

export interface IListSelection {
  type:
    | 'listNumOfEmployee'
    | 'listProvince'
    | 'listCity'
    | 'listDistrict'
    | 'listUrban'
    | 'listVehicleAccessAmount'
    | 'listUrbanID'
    | 'listVehicleAccess'
    | 'listBank';
  params?: string;
  meta?: {
    skip?: number;
    limit?: number;
    keyword?: string;
  };
  action?: 'create' | 'edit' | undefined;
}
export interface IUrbanID {
  params?: string;
  meta?: {
    skip?: number;
    limit?: number;
    keyword?: string;
  };
}
