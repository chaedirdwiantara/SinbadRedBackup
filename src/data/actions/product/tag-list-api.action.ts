/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const tagListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.TagListProcessProps,
): models.TagListProcessAction => {
  contextDispatch({ type: types.TAG_LIST_PROCESS, payload });
  return { type: types.TAG_LIST_PROCESS, payload, contextDispatch };
};
/** => Succeeded */
export const tagListSuccess = (
  payload: models.TagListSuccessProps,
): models.TagListSuccessAction => {
  return { type: types.TAG_LIST_SUCCESS, payload };
};
/** => Failed */
export const tagListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.TAG_LIST_FAILED, payload };
};
/** => Refresh */
export const tagListRefresh = () => {
  return { type: types.TAG_LIST_REFRESH };
};
/** => Reset */
export const tagListReset = () => {
  return { type: types.TAG_LIST_RESET };
};
