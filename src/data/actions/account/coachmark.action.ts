import * as types from '@types';
import * as models from '@models';

export const getCoachmarkProcess = (): models.IAction<any> => {
  return { type: types.GET_COACHMARK_PROCESS };
};

export const getCoachmarkSuccess = (
  data: models.ICoachmarkData,
): models.IAction<models.ICoachmarkData> => {
  return { type: types.GET_COACHMARK_SUCCESS, payload: data };
};

export const getCoachmarkFailed = (data: any): models.IAction<any> => {
  return { type: types.GET_COACHMARK_FAILED, payload: data };
};

export const updateCoachmarkProcess = (
  data: models.ICoachmarkAction,
): models.IAction<models.ICoachmarkAction> => {
  return { type: types.UPDATE_COACHMARK_PROCESS, payload: data };
};

export const updateCoachmarkSuccess = (data: any): models.IAction<any> => {
  return { type: types.UPDATE_COACHMARK_SUCCESS, payload: data };
};

export const updateCoachmarkFailed = (data: any): models.IAction<any> => {
  return { type: types.UPDATE_COACHMARK_FAILED, payload: data };
};

export const resetCoachmark = (): models.IAction<any> => {
  return { type: types.RESET_COACHMARK };
};
