import * as types from '@types';
import * as models from '@models';

/** === ACTIONS === */
/** => Process */
export const menuStatusListProcess = (
  contextDispatch: (action: any) => any
) : models.ListMenuStatusProcessAction => {
  contextDispatch({ type: types.MENU_STATUS_LIST_PROCESS});
  return { type: types.MENU_STATUS_LIST_PROCESS , contextDispatch};
}
/** => Succeeded */
export const menuStatusListSuccess = (
  payload: models.ListSuccessV3Props<Array<models.MenuStatusList>>,
): models.ListSuccessV3Action<models.MenuStatusList[]> => {
  return { type: types.MENU_STATUS_LIST_SUCCESS, payload}
}
/** => Failed */
export const menuStatusListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return {type: types.MENU_STATUS_LIST_FAILED , payload}
}
