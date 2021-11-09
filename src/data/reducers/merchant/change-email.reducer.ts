/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ChangeEmailInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const changeEmailInitialState: ChangeEmailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const changeEmailReducer = simplifyReducer(changeEmailInitialState, {
  /** ===> DETAIL */
  /** => create process */
  [types.CHANGE_EMAIL_PROCESS]() {
    return {
      ...changeEmailInitialState,
      loading: true,
    };
  },
  /** => create success */
  [types.CHANGE_EMAIL_SUCCESS](
    state = changeEmailInitialState,
    action: models.CreateSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => create failed */
  [types.CHANGE_EMAIL_FAILED](
    state = changeEmailInitialState,
    action: models.CreateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => reset */
  [types.CHANGE_EMAIL_RESET]() {
    return changeEmailInitialState;
  },
});
