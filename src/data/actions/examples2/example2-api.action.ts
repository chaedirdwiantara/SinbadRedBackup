import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => list example2 process */
export const example2ListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.EXAMPLE2_LIST_PROCESS, payload: data });
  return { type: types.EXAMPLE2_LIST_PROCESS, payload: data, contextDispatch };
};
/** => list example2 success */
export const example2ListSuccess = (
  data: models.ListSuccessProps<models.Example[]>,
): models.ListSuccessAction<models.Example[]> => {
  return { type: types.EXAMPLE2_LIST_SUCCESS, payload: data };
};
/** => list example2 failed */
export const example2ListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.EXAMPLE2_LIST_FAILED, payload: data };
};
/** => list example2 refresh */
export const example2ListRefresh = () => {
  return { type: types.EXAMPLE2_LIST_REFRESH };
};
/** => list example2 reset */
export const example2ListReset = () => {
  return { type: types.EXAMPLE2_LIST_RESET };
};
/** => list example2 load more */
export const example2ListLoadMore = () => {
  return { type: types.EXAMPLE2_LIST_LOADMORE };
};
/** === DETAIL === */
/** => detail example2 process */
export const example2DetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.EXAMPLE2_DETAIL_PROCESS, payload: data });
  return {
    type: types.EXAMPLE2_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => detail example2 process */
export const example2DetailSuccess = (
  data: models.DetailSuccessProps<models.Example>,
): models.DetailSuccessAction<models.Example> => {
  return { type: types.EXAMPLE2_DETAIL_SUCCESS, payload: data };
};
/** => detail example2 failed */
export const example2DetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.EXAMPLE2_DETAIL_FAILED, payload: data };
};
/** => detail example2 reset */
export const example2DetailReset = () => {
  return { type: types.EXAMPLE2_DETAIL_RESET };
};
