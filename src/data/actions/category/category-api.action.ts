import * as types from '@types';
import * as models from '@models';
/** === CATEGORY HOME === */
/** => process */
export const categoryHomeProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.CATEGORY_HOME_PROCESS, payload: data });
  return { type: types.CATEGORY_HOME_PROCESS, payload: data, contextDispatch };
};
/** => process */
export const categoryHomeSuccess = (
  data: models.ListSuccessProps<models.CategoryHome[]>,
): models.ListSuccessAction<models.CategoryHome[]> => {
  return { type: types.CATEGORY_HOME_SUCCESS, payload: data };
};
/** => failed */
export const categoryHomeFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.CATEGORY_HOME_FAILED, payload: data };
};
/** => reset */
export const categoryHomeReset = () => {
  return { type: types.CATEGORY_HOME_RESET };
};
/** === CATEGORY LEVEL === */
/** => process */
export const categoryLevelProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.CATEGORY_LEVEL_PROCESS, payload: data });
  return { type: types.CATEGORY_LEVEL_PROCESS, payload: data, contextDispatch };
};
/** => process */
export const categoryLevelSuccess = (
  data: models.ListSuccessProps<models.CategoryLevel[]>,
): models.ListSuccessAction<models.CategoryLevel[]> => {
  return { type: types.CATEGORY_LEVEL_SUCCESS, payload: data };
};
/** => failed */
export const categoryLevelFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.CATEGORY_LEVEL_FAILED, payload: data };
};
/** => reset */
export const categoryLevelReset = () => {
  return { type: types.CATEGORY_LEVEL_RESET };
};
