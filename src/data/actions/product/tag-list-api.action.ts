/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const tagListProcess = (
  contextDispatch: (action: any) => any,
  data: models.TagListProcessProps,
): models.TagListProcessAction => {
  contextDispatch({ type: types.TAG_LIST_PROCESS, payload: data });
  return { type: types.TAG_LIST_PROCESS, payload: data, contextDispatch };
};
/** => Succeeded */
export const tagListSuccess = (
  data: models.TagListSuccessProps,
): models.TagListSuccessAction => {
  return { type: types.TAG_LIST_SUCCESS, payload: data };
};
/** => Failed */
export const tagListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.TAG_LIST_FAILED, payload: data };
};
/** => Refresh */
export const tagListRefresh = () => {
  return { type: types.TAG_LIST_REFRESH };
};
/** => Reset */
export const tagListReset = () => {
  return { type: types.TAG_LIST_RESET };
};
