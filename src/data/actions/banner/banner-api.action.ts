import * as types from '@types';
import * as models from '@models';
/** === BANNER SLIDER === */
/** => banner slider process */
export const bannerSliderProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  return {
    type: types.BANNER_SLIDER_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => banner slider success */
export const bannerSliderSuccess = (
  data: models.DetailSuccessProps<models.BannerSliderSuccessProps>,
): models.DetailSuccessAction<models.BannerSliderSuccessProps> => {
  return { type: types.BANNER_SLIDER_SUCCESS, payload: data };
};
/** => banner slider failed */
export const bannerSliderFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.BANNER_SLIDER_FAILED, payload: data };
};
/** === BANNER LIST === */
/** => banner list process */
export const bannerListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  return {
    type: types.BANNER_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => banner list success */
export const bannerListSuccess = (
  data: models.DetailSuccessProps<models.BannerListSuccessProps>,
): models.DetailSuccessAction<models.BannerListSuccessProps> => {
  return { type: types.BANNER_LIST_SUCCESS, payload: data };
};
/** => bannerlist failed */
export const bannerListFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.BANNER_LIST_FAILED, payload: data };
};
/** => bannerlist refresh */
export const bannerListRefresh = () => {
  return { type: types.BANNER_LIST_REFRESH };
};
/** => bannerlist reset */
export const bannerListReset = () => {
  return { type: types.BANNER_LIST_RESET };
};
/** => bannerlist more */
export const bannerListLoadMore = () => {
  return { type: types.BANNER_LIST_LOADMORE };
};
