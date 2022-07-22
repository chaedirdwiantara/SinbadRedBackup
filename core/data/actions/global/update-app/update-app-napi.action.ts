import * as types from '@types';
import * as models from '@models';
/** === CHANEG FLAG RTDB === */
export const updateApp = (data: boolean): models.updateAppAction => {
  return { type: types.UPDATE_APP, payload: data };
};
