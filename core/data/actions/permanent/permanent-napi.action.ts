import * as types from '@types';
import * as models from '@models';
/** => FOR FCM FLAG */
export const isFCM = (payload: boolean): models.IsFCMAction => {
  return { type: types.IS_FCM, payload };
};
/** => FOR INTRO SINBAD FLAG */
export const isIntroSinbad = (payload: boolean): models.IsIntroSinbadAction => {
  return { type: types.IS_INTRO_SINBAD, payload };
};
/** => FOR INTRO SINBAD FLAG */
export const setSearchKeywords = (
  payload: Array<string>,
): models.SetSearchKeywordActions => {
  return { type: types.SEARCH_KEYWORDS_PRODUCT, payload };
};
/** => APP VERSION */
export const appVersion = (payload: any): models.AppVersionActions => {
  return { type: types.SAVE_APP_VERSION, payload };
};
/** => FOR FORCE UPDATE VERSION */
export const forceUpdateVersion = (
  payload: number,
): models.ForceUpdateVersionActions => {
  return { type: types.FORCE_UPDATE_VERSION, payload };
};
/** => FOR MAINTENANCE */
export const maintenance = (payload: boolean): models.MaintenanceActions => {
  return { type: types.MAINTENANCE, payload };
};
