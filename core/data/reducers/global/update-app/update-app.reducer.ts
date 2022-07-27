/** === IMPORT HERE === */
import * as types from '../../../types';
import * as models from '../../../models';
import simplifyReducer from '../../../../redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.updateApp = {
  isUpdateApp: false,
};
/** === FUNCTION HERE === */
export const updateApp = simplifyReducer(initialState, {
  [types.UPDATE_APP](state = initialState, action: models.updateAppAction) {
    return {
      ...state,
      isUpdateApp: action.payload,
    };
  },
});
