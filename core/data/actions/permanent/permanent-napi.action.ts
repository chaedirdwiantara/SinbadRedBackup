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
