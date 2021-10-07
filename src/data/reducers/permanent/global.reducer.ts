/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.GlobalProps = {
  dataCart: null,
  isFCM: false,
};
/** === FUNCTION HERE === */
export const global = simplifyReducer(initialState, {
  [types.GLOBAL_PROCESS](state = initialState) {
    return {
      ...state,
      dataCart: null,
    };
  },
  /** => FOR FCM FLAG */
  [types.IS_FCM](state = initialState, action: models.IsFCMAction) {
    return {
      ...state,
      isFCM: action.payload,
    };
  },
});
