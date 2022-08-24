import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type VoucherCartDetailInitialProps =
  models.DetailItemProps<models.VoucherCartDetailProps>;
/** === INITIAL STATE HERE === */
export const voucherCartDetailInitialState: VoucherCartDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const voucherCartDetailReducer = simplifyReducer(
  voucherCartDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.VOUCHER_DETAIL_PROCESS]() {
      return {
        ...voucherCartDetailInitialState,
        loading: true,
      };
    },
    /** => detail success */
    [types.VOUCHER_DETAIL_SUCCESS](
      state = voucherCartDetailInitialState,
      action: models.DetailSuccessAction<models.VoucherCartDetailProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.VOUCHER_DETAIL_FAILED](
      state = voucherCartDetailInitialState,
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
      return voucherCartDetailInitialState;
    },
  },
);
