/** === IMPORT HERE === */
import * as types from '../../../types';
import * as models from '../../../models';
import simplifyReducer from '../../../../../core/redux/simplifyReducer';
/** === TYPE HERE === */
type VoucherDetailInitialProps =
  models.DetailItemProps<models.VoucherDetailProps>;
/** === INITIAL STATE HERE === */
export const voucherDetailInitialState: VoucherDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const voucherDetailReducer = simplifyReducer(voucherDetailInitialState, {
  /** ===> DETAIL */
  /** => detail process */
  [types.VOUCHER_DETAIL_PROCESS]() {
    return {
      ...voucherDetailInitialState,
      loading: true,
    };
  },
  /** => detail success */
  [types.VOUCHER_DETAIL_SUCCESS](
    state = voucherDetailInitialState,
    action: models.DetailSuccessAction<models.VoucherDetailProps>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => detail failed */
  [types.VOUCHER_DETAIL_FAILED](
    state = voucherDetailInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => detail reset */
  [types.VOUCHER_DETAIL_RESET]() {
    return voucherDetailInitialState;
  },
});
