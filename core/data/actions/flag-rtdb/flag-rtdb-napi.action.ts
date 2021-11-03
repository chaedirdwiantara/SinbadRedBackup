import * as types from '../../types';
import * as models from '../../models';
/** === CHANEG FLAG RTDB === */
export const isFlagChange = (
  data: models.FlagRTDBData,
): models.isFlagChangeAction => {
  return { type: types.CHANGE_FLAG_RTDB, payload: data };
};
