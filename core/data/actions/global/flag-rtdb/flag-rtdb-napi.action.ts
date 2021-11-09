import * as types from '@types';
import * as models from '@models';
/** === CHANEG FLAG RTDB === */
export const isFlagRTDBChange = (
  data: models.FlagRTDBData,
): models.isFlagRTDBChangeAction => {
  return { type: types.CHANGE_FLAG_RTDB, payload: data };
};
