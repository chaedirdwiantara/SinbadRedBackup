import * as types from '@types';
import * as models from '@models';
/** === BRAND LIST === */
/** => brand list process */
export const brandListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  return {
    type: types.BRAND_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => brand list success */
export const brandListSuccess = (
  data: models.DetailSuccessProps<models.BrandListSuccessProps>,
): models.DetailSuccessAction<models.BrandListSuccessProps> => {
  return { type: types.BRAND_LIST_SUCCESS, payload: data };
};
/** => brand list failed */
export const brandListFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.BRAND_LIST_FAILED, payload: data };
};
/** => brand list refresh */
export const brandListRefresh = () => {
  return { type: types.BRAND_LIST_REFRESH };
};
/** => brand list reset */
export const brandListReset = () => {
  return { type: types.BRAND_LIST_RESET };
};
/** => brand list more */
export const brandListLoadMore = () => {
  return { type: types.BRAND_LIST_LOADMORE };
};
