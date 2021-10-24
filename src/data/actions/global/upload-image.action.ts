import * as types from '@types';
import * as models from '@models';
/** === CATEGORY HOME === */
/** => save */
export const uploadImageSave = (
  contextDispatch: (action: any) => any,
  data: models.UploadImageSaveProps,
): models.uploadImageAction => {
  contextDispatch({ type: types.UPLOAD_IMAGE_SAVE, payload: data });
  return { type: types.UPLOAD_IMAGE_SAVE, payload: data, contextDispatch };
};
/** => process */
export const uploadImageProcess = (
  contextDispatch: (action: any) => any,
  data: models.UploadImageSaveProps,
): models.uploadImageAction => {
  contextDispatch({ type: types.UPLOAD_IMAGE_PROCESS, payload: data });
  return { type: types.UPLOAD_IMAGE_PROCESS, payload: data, contextDispatch };
};
/** => success */
export const uploadImageSuccess = (
  data: models.DetailSuccessProps<models.UploadImageDataProps>,
): models.DetailSuccessAction<models.UploadImageDataProps> => {
  return { type: types.UPLOAD_IMAGE_SUCCESS, payload: data };
};
/** => failed */
export const uploadImageFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.UPLOAD_IMAGE_FAILED, payload: data };
};
/** => reset */
export const uploadImageReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.UPLOAD_IMAGE_RESET });
  return { type: types.UPLOAD_IMAGE_RESET };
};
