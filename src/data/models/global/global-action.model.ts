/** === IMPORT EXTERNAL MODEL === */
import { ITypeList } from '..';
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
  type: ITypeList;
  params?: string;
  meta?: {
    page?: number;
    perPage?: number;
    keyword?: string;
  };
  action?: 'create' | 'edit' | undefined;
}
export interface ILocationSearch {
  params?: string;
}

export interface IOnSelectedItem {
  type: ITypeList;
  item: any;
}
