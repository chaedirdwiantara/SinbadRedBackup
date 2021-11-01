/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ChangePasswordInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const changePasswordInitialState: ChangePasswordInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const changePasswordReducer = simplifyReducer(
  changePasswordInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.CHANGE_PASSWORD_PROCESS]() {
      return {
        ...changePasswordInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.CHANGE_PASSWORD_SUCCESS](
      state = changePasswordInitialState,
      action: models.UpdateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.CHANGE_PASSWORD_FAILED](
      state = changePasswordInitialState,
      action: models.UpdateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.CHANGE_PASSWORD_RESET]() {
      return changePasswordInitialState;
    },
  },
);
