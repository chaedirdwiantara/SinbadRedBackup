/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ChangeMobilePhoneInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const changeMobilePhoneInitialState: ChangeMobilePhoneInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const changeMobilePhoneReducer = simplifyReducer(
  changeMobilePhoneInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.CHANGE_MOBILE_PHONE_PROCESS]() {
      return {
        ...changeMobilePhoneInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.CHANGE_MOBILE_PHONE_SUCCESS](
      state = changeMobilePhoneInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.CHANGE_MOBILE_PHONE_FAILED](
      state = changeMobilePhoneInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.CHANGE_MOBILE_PHONE_RESET]() {
      return changeMobilePhoneInitialState;
    },
  },
);
