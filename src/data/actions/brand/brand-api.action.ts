import * as types from '@types';
import * as models from '@models';
/** === LIST ACTIONS === */
/** => Process */
export const brandListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.BRAND_LIST_PROCESS, payload });
  return {
    type: types.BRAND_LIST_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const brandListSuccess = (
  payload: models.ListSuccessProps<models.BrandListItem[]>,
): models.ListSuccessAction<models.BrandListItem[]> => {
  return { type: types.BRAND_LIST_SUCCESS, payload };
};
/** => Failed */
export const brandListFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.BRAND_LIST_FAILED, payload };
};
/** => Refresh */
export const brandListRefresh = () => {
  return { type: types.BRAND_LIST_REFRESH };
};
/** => Reset */
export const brandListReset = () => {
  return { type: types.BRAND_LIST_RESET };
};
/** => Load More */
export const brandListLoadMore = () => {
  return { type: types.BRAND_LIST_LOADMORE };
};
