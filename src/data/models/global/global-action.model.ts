/** === IMPORT EXTERNAL MODEL === */
import { UploadImageSaveProps } from './global.model';
/** === FCM FLAG === */
export interface IsFCMAction {
  type: string;
  payload: boolean;
}
/** === UPLOAD IMAGE === */
export interface uploadImageAction {
  type: string;
  payload: UploadImageSaveProps;
  contextDispatch: (action: any) => any;
}
