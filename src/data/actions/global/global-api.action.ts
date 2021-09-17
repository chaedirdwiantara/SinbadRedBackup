import * as types from '@types';
import * as models from '@models';

export const uploadImageProcess = (
  data: models.IUploadImage,
): models.IRegisterAction<models.IUploadImage> => {
  return {
    type: types.UPLOAD_IMAGE_PROCESS,
    payload: data,
  };
};

export const uploadImageSuccess = (data: any): models.IRegisterAction<any> => {
  return {
    type: types.UPLOAD_IMAGE_SUCCESS,
    payload: data,
  };
};

export const uploadImageFailed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<any | unknown> => {
  return {
    type: types.UPLOAD_IMAGE_FAILED,
    payload: data,
  };
};
