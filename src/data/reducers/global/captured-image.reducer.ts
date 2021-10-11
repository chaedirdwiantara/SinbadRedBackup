import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
};

export const capturedImage = simplifyReducer(INITIAL_STATE, {
  [types.SAVE_CAPTURED_IMAGE](_: any, action: models.IRegisterAction<any>) {
    return { ...INITIAL_STATE, data: action.payload };
  },
});
