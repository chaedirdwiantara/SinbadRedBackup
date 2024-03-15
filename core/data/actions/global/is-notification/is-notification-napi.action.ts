import * as types from '@types';
import * as models from '@models';
/** === CHANEG FLAG RTDB === */
export const notificationQuit = (
  data: boolean,
): models.notificationQuitAction => {
  return { type: types.IS_NOTIFICATION, payload: data };
};
