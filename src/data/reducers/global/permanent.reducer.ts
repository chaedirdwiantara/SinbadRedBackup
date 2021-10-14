/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.GlobalProps = {
  isFCM: false,
};
/** === FUNCTION HERE === */
export const permanent = simplifyReducer(initialState, {
  /** => FOR FCM FLAG */
  [types.IS_FCM](state = initialState, action: models.IsFCMAction) {
    return {
      ...state,
      isFCM: action.payload,
    };
  },
});
