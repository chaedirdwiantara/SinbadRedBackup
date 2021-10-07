import * as types from '@types';
import * as models from '@models';
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

export const resetGetSelection = () => {
  return {
    type: types.GET_SELECTION_RESET,
  };
};

export const resetRequestOTP = () => {
  return {
    type: types.REQUEST_OTP_RESET,
  };
};

export const onSelectedItem = (data: any) => {
  return {
    type: types.SELECTED_ITEM,
    payload: data,
  };
};

export const resetLocation = () => {
  return {
    type: types.GET_LOCATION_RESET,
  };
};
