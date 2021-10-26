import * as types from '@types';
import * as models from '@models';

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
