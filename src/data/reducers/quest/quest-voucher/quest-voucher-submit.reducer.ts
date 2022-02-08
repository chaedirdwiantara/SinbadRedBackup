/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type QuestTaskSubmitVoucherInitialProps = models.UpdateItemProps;
/** === INITIAL STATE HERE */
export const questTaskSubmitVoucherInitialState: QuestTaskSubmitVoucherInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const questTaskSubmitVoucherReducer = simplifyReducer(
  questTaskSubmitVoucherInitialState,
  {
    /** ===> SUBMIT VOUCHER */
    /** => submit process */
    [types.QUEST_SUBMIT_VOUCHER_PROCESS](
      state = questTaskSubmitVoucherInitialState,
    ) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => submit success */
    [types.QUEST_SUBMIT_VOUCHER_SUCCESS](
      state = questTaskSubmitVoucherInitialState,
      action: models.UpdateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => submit failed */
    [types.QUEST_SUBMIT_VOUCHER_FAILED](
      state = questTaskSubmitVoucherInitialState,
      action: models.UpdateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => submit reset */
    [types.QUEST_SUBMIT_VOUCHER_RESET]() {
      return questTaskSubmitVoucherInitialState;
    },
  },
);
