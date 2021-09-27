/** === IMPORT HERE === */
import * as types from '../../../types';
import * as models from '../../../models';
import simplifyReducer from '../../../../../core/redux/simplifyReducer';
/** === TYPE HERE === */
type VoucherCartListInitialProps =
  models.DetailItemProps<models.VoucherCartListProps>;
/** === INITIAL STATE HERE === */
export const voucherCartListInitialState: VoucherCartListInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const voucherCartListReducer = simplifyReducer(
  voucherCartListInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.VOUCHER_CART_LIST_PROCESS]() {
      return {
        ...voucherCartListInitialState,
        loading: true,
      };
    },
    /** => detail success */
    [types.VOUCHER_CART_LIST_SUCCESS](
      state = voucherCartListInitialState,
      action: models.DetailSuccessAction<models.VoucherCartListProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.VOUCHER_CART_LIST_FAILED](
      state = voucherCartListInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.VOUCHER_CART_LIST_RESET]() {
      return voucherCartListInitialState;
    },
  },
);
