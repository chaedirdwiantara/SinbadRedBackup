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
