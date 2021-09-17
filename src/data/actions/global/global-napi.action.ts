import * as types from '@types';
/** => FOR FCM FLAG */
export const isFCM = (data: boolean) => {
  return { type: types.IS_FCM, payload: data };
};

export const saveCapturedImage = (data: any) => ({
  type: types.SAVE_CAPTURED_IMAGE,
  payload: data,
});

export const resetUploadImage = () => ({
  type: types.UPLOAD_IMAGE_RESET,
});
