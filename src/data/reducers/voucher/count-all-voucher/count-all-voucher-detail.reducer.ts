/** === IMPORT HERE === */
import * as types from '../../../types';
import * as models from '../../../models';
import simplifyReducer from '../../../../../core/redux/simplifyReducer';
/** === TYPE HERE === */
type CountAllVoucherInitialProps =
  models.DetailItemProps<models.CountAllVoucherProps>;
/** === INITIAL STATE HERE === */
export const countAllVoucherInitialState: CountAllVoucherInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const countAllVoucherReducer = simplifyReducer(
  countAllVoucherInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.COUNT_ALL_VOUCHER_PROCESS]() {
      return {
        ...countAllVoucherInitialState,
        loading: true,
      };
    },
    /** => detail success */
    [types.COUNT_ALL_VOUCHER_SUCCESS](
      state = countAllVoucherInitialState,
      action: models.DetailSuccessAction<models.CountAllVoucherProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.COUNT_ALL_VOUCHER_FAILED](
      state = countAllVoucherInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.COUNT_ALL_VOUCHER_RESET]() {
      return countAllVoucherInitialState;
    },
  },
);
