/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type QuestVoucherValidateInitialProps =
  models.DetailItemProps<models.QuestValidateVoucherItem>;
/** === INITIAL STATE HERE */
export const questVoucherValidateInitialState: QuestVoucherValidateInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const questVoucherValidateReducer = simplifyReducer(
  questVoucherValidateInitialState,
  {
    /** ===> VALIDATE VOUCHER */
    /** => validate voucher process */
    [types.QUEST_VALIDATE_VOUCHER_PROCESS](
      state = questVoucherValidateInitialState,
    ) {
      console.log('state 123', state);
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => validate voucher success */
    [types.QUEST_VALIDATE_VOUCHER_SUCCESS](
      state = questVoucherValidateInitialState,
      action: models.DetailSuccessAction<models.QuestValidateVoucherItem>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => validate voucher failed */
    [types.QUEST_VALIDATE_VOUCHER_FAILED](
      state = questVoucherValidateInitialState,
      action: models.DetailFailedAction,
    ) {
      console.log('action 123', action);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.QUEST_VALIDATE_VOUCHER_RESET]() {
      return questVoucherValidateInitialState;
    },
  },
);
