import * as models from '@models';
/** === FCM FLAG === */
export interface IsFCMAction {
  type: string;
  payload: boolean;
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
/** === SELECTED VOUCHER DATA === */
export interface selectedVoucherDataAction {
  type: string;
  payload: models.selectedVoucherDataProps;
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
    | 'listVehicleAccess';
  params?: string;
  meta?: {
    skip?: number;
    limit?: number;
    keyword?: string;
  };
}
export interface IUrbanID {
  params?: string;
  meta?: {
    skip?: number;
    limit?: number;
    keyword?: string;
  };
}
