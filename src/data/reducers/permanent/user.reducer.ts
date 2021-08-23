/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.UserProps = {
  user: null,
};
/** === FUNCTION HERE === */
export const user = simplifyReducer(initialState, {
  [types.LOGIN_SUCCESS]() {
    return {
      ...initialState,
      user: null,
    };
  },
});
