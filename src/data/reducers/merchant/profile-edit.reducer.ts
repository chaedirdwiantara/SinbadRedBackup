/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ProfileEditInitialProps = models.UpdateItemProps;
/** === INITIAL STATE HERE === */
export const profileEditInitialState: ProfileEditInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const profileEditReducer = simplifyReducer(profileEditInitialState, {
  /** ===> DETAIL */
  /** => create process */
  [types.PROFILE_EDIT_PROCESS]() {
    return {
      ...profileEditInitialState,
      loading: true,
    };
  },
  /** => create success */
  [types.PROFILE_EDIT_SUCCESS](
    state = profileEditInitialState,
    action: models.UpdateSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => create failed */
  [types.PROFILE_EDIT_FAILED](
    state = profileEditInitialState,
    action: models.UpdateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => list reset */
  [types.PROFILE_EDIT_RESET]() {
    return profileEditInitialState;
  },
});
