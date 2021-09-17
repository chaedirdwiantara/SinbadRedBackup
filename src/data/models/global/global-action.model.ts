/** === FCM FLAG === */
export interface IsFCMAction {
  type: string;
  payload: boolean;
}

export interface IUploadImage {
  image: string;
  type: 'idCard' | 'selfie' | 'userTax' | 'storePhoto';
  oldLink: string;
}
