/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '../../models';
import simplifyReducer from '../../../../core/redux/simplifyReducer';
/** === TYPE HERE === */
type VoucherCartListInitialProps = models.ListItemProps<
  models.VoucherCartList[]
>;
/** === INITIAL STATE HERE === */
export const voucherCartListInitialState: VoucherCartListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const voucherCartListReducer = simplifyReducer(
  voucherCartListInitialState,
  {
    /** ===> LIST */
    /** => voucher cart list process */
    [types.VOUCHER_CART_LIST_PROCESS](
      state = voucherCartListInitialState,
      action: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.VOUCHER_CART_LIST_SUCCESS](
      state = voucherCartListInitialState,
      action: models.ListSuccessAction<models.VoucherCartList[]>,
    ) {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        loading: false,
        loadMore: false,
        refresh: false,
        total: action.payload.meta.total,
        skip: action.payload.meta.skip,
      };
    },
    /** => list failed */
    [types.VOUCHER_CART_LIST_FAILED](
      state = voucherCartListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        loadMore: false,
        refresh: false,
        error: action.payload,
      };
    },
    /** => voucher cart list reset */
    [types.VOUCHER_CART_LIST_RESET]() {
      return voucherCartListInitialState;
    },
    /** => voucher cart list refresh */
    [types.VOUCHER_CART_LIST_REFRESH]() {
      return {
        ...voucherCartListInitialState,
        refresh: true,
      };
    },
    /** => voucher cart list load more */
    [types.VOUCHER_CART_LIST_LOADMORE](state = voucherCartListInitialState) {
      return {
        ...state,
        loadMore: true,
      };
    },
  },
);
