/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '../../models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.Permanent = {
  isFCM: false,
  isIntroSinbad: false,
  searchedKeywords: [],
  appVersion: null,
  forceUpdateVersion: 0,
  maintenance: false,
  advertisingId: '',
};
/** === FUNCTION HERE === */
export const permanentCore = simplifyReducer(initialState, {
  /** => FOR FCM FLAG */
  [types.IS_FCM](state = initialState, { payload }: models.IsFCMAction) {
    return {
      ...state,
      isFCM: payload,
    };
  },
  /** => FOR INTRO SINBAD FLAG */
  [types.IS_INTRO_SINBAD](
    state = initialState,
    { payload }: models.IsIntroSinbadAction,
  ) {
    return {
      ...state,
      isIntroSinbad: payload,
    };
  },
  /** => FOR SET SEARCH KEYWORDS FLAG */
  [types.SEARCH_KEYWORDS_PRODUCT](
    state = initialState,
    { payload }: models.SetSearchKeywordActions,
  ) {
    return {
      ...state,
      searchedKeywords: payload,
    };
  },
  /** => APP VERSION */
  [types.SAVE_APP_VERSION](
    state = initialState,
    { payload }: models.AppVersionActions,
  ) {
    return {
      ...state,
      appVersion: payload,
    };
  },
  /** => FORCE UPDATE */
  [types.FORCE_UPDATE_VERSION](
    state = initialState,
    { payload }: models.ForceUpdateVersionActions,
  ) {
    return {
      ...state,
      forceUpdateVersion: payload,
    };
  },
  /** => MAINTENANCE */
  [types.MAINTENANCE](
    state = initialState,
    { payload }: models.MaintenanceActions,
  ) {
    return {
      ...state,
      maintenance: payload,
    };
  },
  /** => SAVE ADS ID */
  [types.SAVE_ADS_ID](
    state = initialState,
    { payload }: models.SaveAdsIDAction,
  ) {
    return {
      ...state,
      advertisingId: payload,
    };
  },
});
