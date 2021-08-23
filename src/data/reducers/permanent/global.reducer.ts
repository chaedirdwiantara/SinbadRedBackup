/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.GlobalProps = {
  dataCart: null,
};
/** === FUNCTION HERE === */
export const global = simplifyReducer(initialState, {
  [types.GLOBAL_PROCESS]() {
    return {
      ...initialState,
      dataCart: null,
    };
  },
});
