/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type AuthMeV2Props = models.DetailItemProps<models.AuthMeV2DataProps>;
/** === INITIAL STATE HERE === */
export const authMeV2InitialState: AuthMeV2Props = {
  data: null,
  error: null,
  loading: true,
};
/** === FUNCTION HERE === */
export const authMeV2Reducer = simplifyReducer(authMeV2InitialState, {
  /** => process */
  [types.ME_V2_PROCESS](state = authMeV2InitialState) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  /** => success */
  [types.ME_V2_SUCCESS](
    state = authMeV2InitialState,
    action: models.MeSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload,
      loading: false,
    };
  },
  /** => failed */
  [types.ME_V2_FAILED](
    state = authMeV2InitialState,
    action: models.MeFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => reset */
  [types.ME_V2_RESET]() {
    return authMeV2InitialState;
  },
});
