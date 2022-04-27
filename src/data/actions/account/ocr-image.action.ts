import * as types from '@types';
import * as models from '@models';

export const ocrImageProcess = (
  data: models.IOCRImage,
): models.IAction<models.IOCRImage> => ({
  type: types.OCR_IMAGE_PROCESS,
  payload: data,
});

export const ocrImageSuccess = (
  data: models.IImageVerification,
): models.IAction<models.IImageVerification> => ({
  type: types.OCR_IMAGE_SUCCESS,
  payload: data,
});

export const ocrImageFailed = (data: any): models.IAction<any> => ({
  type: types.OCR_IMAGE_FAILED,
  payload: data,
});

export const ocrImageReset = () => ({
  type: types.OCR_IMAGE_RESET,
});
