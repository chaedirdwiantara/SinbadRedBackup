import * as types from '@types';
import * as models from '@models';
/** => set reserved at */
export const setReservedAt = (
  payload: models.ReserveData,
): models.SetReservedAt => {
  return { type: types.SET_RESERVED_AT, payload };
};
