import * as types from '@types';
import * as models from '@models';

// export const uploadImageProcess = (
//   data: models.IUploadImage,
// ): models.IRegisterAction<models.IUploadImage> => {
//   return {
//     type: types.UPLOAD_IMAGE_PROCESS,
//     payload: data,
//   };
// };

// export const uploadImageSuccess = (
//   data: models.IUploadImageSuccess,
// ): models.IRegisterAction<models.IUploadImageSuccess> => {
//   return {
//     type: types.UPLOAD_IMAGE_SUCCESS,
//     payload: data,
//   };
// };

// export const uploadImageFailed = (
//   data: models.ErrorProps | unknown,
// ): models.IRegisterAction<any | unknown> => {
//   return {
//     type: types.UPLOAD_IMAGE_FAILED,
//     payload: data,
//   };
// };

export const getSelectionProcess = (data: any) => {
  return {
    type: types.GET_SELECTION_PROCESS,
    payload: data,
  };
};

export const getSelectionSuccess = (data: any) => {
  return {
    type: types.GET_SELECTION_SUCCESS,
    payload: data,
  };
};

export const getSelectionFailed = (data: any) => {
  return {
    type: types.GET_SELECTION_FAILED,
    payload: data,
  };
};

export const getLocationProcess = (
  data: models.IUrbanID,
): models.IRegisterAction<any> => {
  return {
    type: types.GET_LOCATION_PROCESS,
    payload: data,
  };
};

export const getLocationSuccess = (data: any): models.IRegisterAction<any> => {
  return {
    type: types.GET_LOCATION_SUCCESS,
    payload: data,
  };
};

export const getLocationFailed = (data: any): models.IRegisterAction<any> => {
  return {
    type: types.GET_LOCATION_FAILED,
    payload: data,
  };
};