/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type AuthCheckPhoneLoginProps = models.DetailItemProps<models.ICheckPhoneLoginSuccess>;
/** === INITIAL STATE HERE === */
export const CheckPhoneLoginInitialState: AuthCheckPhoneLoginProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const authCheckPhoneLoginReducer = simplifyReducer(
  CheckPhoneLoginInitialState,
  {
    /** => process */
    [types.CHECK_PHONE_LOGIN_PROCESS](state = CheckPhoneLoginInitialState) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => success */
    [types.CHECK_PHONE_LOGIN_SUCCESS](
      state = CheckPhoneLoginInitialState,
      action: models.RequestOTPSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.CHECK_PHONE_LOGIN_FAILED](
      state = CheckPhoneLoginInitialState,
      action: models.IAction<any>,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.CHECK_PHONE_LOGIN_RESET]() {
      return CheckPhoneLoginInitialState;
    },
  },
);
