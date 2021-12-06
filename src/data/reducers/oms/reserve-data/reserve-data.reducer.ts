/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.ReserveData = {
  reservedAt: null,
};
/** === FUNCTION === */
export const reserveData = simplifyReducer(initialState, {
  /** => SET RESERVED AT */
  [types.SET_RESERVED_AT](
    state = initialState,
    { payload }: models.SetReservedAt,
  ) {
    return {
      ...state,
      reservedAt: payload,
    };
  },
});
