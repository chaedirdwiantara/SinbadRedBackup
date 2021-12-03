import * as types from '@types';
import * as models from '@models';
/** => FOR FCM FLAG */
export const isFCM = (data: boolean): models.IsFCMAction => {
  return { type: types.IS_FCM, payload: data };
};
/** => FOR INTRO SINBAD FLAG */
export const isIntroSinbad = (data: boolean): models.IsIntroSinbadAction => {
  return { type: types.IS_INTRO_SINBAD, payload: data };
};
