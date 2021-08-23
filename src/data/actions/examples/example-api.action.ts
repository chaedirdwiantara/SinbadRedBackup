import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => list example process */
export const exampleListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.EXAMPLE_LIST_PROCESS, payload: data });
  return { type: types.EXAMPLE_LIST_PROCESS, payload: data, contextDispatch };
};
/** => list example success */
export const exampleListSuccess = (
  data: models.ListSuccessProps<models.Example[]>,
): models.ListSuccessAction<models.Example[]> => {
  return { type: types.EXAMPLE_LIST_SUCCESS, payload: data };
};
/** => list example failed */
export const exampleListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.EXAMPLE_LIST_FAILED, payload: data };
};
/** => list example refresh */
export const exampleListRefresh = () => {
  return { type: types.EXAMPLE_LIST_REFRESH };
};
/** => list example reset */
export const exampleListReset = () => {
  return { type: types.EXAMPLE_LIST_RESET };
};
/** => list example load more */
export const exampleListLoadMore = () => {
  return { type: types.EXAMPLE_LIST_LOADMORE };
};
/** === DETAIL === */
/** => detail example process */
export const exampleDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.EXAMPLE_DETAIL_PROCESS, payload: data });
  return { type: types.EXAMPLE_DETAIL_PROCESS, payload: data, contextDispatch };
};
/** => detail example process */
export const exampleDetailSuccess = (
  data: models.DetailSuccessProps<models.Example>,
): models.DetailSuccessAction<models.Example> => {
  return { type: types.EXAMPLE_DETAIL_SUCCESS, payload: data };
};
/** => detail example failed */
export const exampleDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.EXAMPLE_DETAIL_FAILED, payload: data };
};
/** => detail example reset */
export const exampleDetailReset = () => {
  return { type: types.EXAMPLE_DETAIL_RESET };
};
