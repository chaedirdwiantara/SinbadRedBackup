import * as types from '@types';
import * as models from '@models';

export const ocrImageProcess = (
  data: models.IOCRImage,
): models.IAction<models.IOCRImage> => ({
  type: types.OCR_IMAGE_PROCESS,
  payload: data,
});

export const ocrImageSuccess = (data: any): models.IAction<any> => ({
  type: types.OCR_IMAGE_SUCCESS,
  payload: data,
});

export const ocrImageFailed = (data: any): models.IAction<any> => ({
  type: types.OCR_IMAGE_FAILED,
  payload: data,
});
