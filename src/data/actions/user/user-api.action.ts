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
