/** === IMPORT HERE === */
import * as types from '../../../types';
import * as models from '../../../models';
import simplifyReducer from '../../../../redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.notificationQuit = {
  isNotification: false,
};
/** === FUNCTION HERE === */
export const notificationQuit = simplifyReducer(initialState, {
  [types.IS_NOTIFICATION](
    state = initialState,
    action: models.notificationQuitAction,
  ) {
    return {
      ...state,
      isNotification: action.payload,
    };
  },
});
