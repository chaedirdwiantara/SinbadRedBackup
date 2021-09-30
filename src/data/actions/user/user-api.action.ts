import * as types from '@types';
import * as models from '@models';
/** === DETAIL === */
/** => store detail process */
export const storeDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types, payload: data });
  return { type: types.STORE_DETAIL_PROCESS, payload: data, contextDispatch };
};
/** => store detail success */
export const storeDetailSuccess = (
  data: models.DetailSuccessProps<models.StoreDetail>,
): models.DetailSuccessAction<models.StoreDetail> => {
  return { type: types.STORE_DETAIL_SUCCESS, payload: data };
};
/** => store detail failed */
export const storeDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.STORE_DETAIL_FAILED, payload: data };
};
/** === UPDATE === */
/** => process */
export const changePasswordProcess = (
  contextDispatch: (action: any) => any,
  data: models.UpdateProcessProps<{}>,
): models.UpdateProcessAction => {
  contextDispatch({
    type: types.CHANGE_PASSWORD_PROCESS,
    payload: data,
  });
  return {
    type: types.CHANGE_PASSWORD_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => success */
export const changePasswordSuccess = (
  data: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.CHANGE_PASSWORD_SUCCESS, payload: data };
};
/** => failed */
export const changePasswordFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.CHANGE_PASSWORD_FAILED, payload: data };
};
