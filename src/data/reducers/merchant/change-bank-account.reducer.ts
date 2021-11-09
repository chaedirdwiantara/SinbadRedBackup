/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ChangeBankAccountInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const changeBankAccountInitialState: ChangeBankAccountInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const changeBankAccountReducer = simplifyReducer(
  changeBankAccountInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.CHANGE_BANK_ACCOUNT_PROCESS]() {
      return {
        ...changeBankAccountInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.CHANGE_BANK_ACCOUNT_SUCCESS](
      state = changeBankAccountInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.CHANGE_BANK_ACCOUNT_FAILED](
      state = changeBankAccountInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.CHANGE_BANK_ACCOUNT_RESET]() {
      return changeBankAccountInitialState;
    },
  },
);
