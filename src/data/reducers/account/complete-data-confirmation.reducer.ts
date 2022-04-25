import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const completeDataConfirmation = simplifyReducer(INITIAL_STATE, {
  [types.COMPLETE_DATA_CONFIRMATION_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.COMPLETE_DATA_CONFIRMATION_SUCCESS](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload?.data,
    };
  },

  [types.COMPLETE_DATA_CONFIRMATION_FAILED](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  [types.RESET_COMPLETE_DATA_CONFIRMATION]() {
    return INITIAL_STATE;
  },
});
