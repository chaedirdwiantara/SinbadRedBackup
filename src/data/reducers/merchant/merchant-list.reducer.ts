/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type SupplierListInitialProps = models.ListItemProps<models.SupplierList[]>;
/** === INITIAL STATE HERE === */
export const supplierListInitialState: SupplierListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const supplierListReducer = simplifyReducer(supplierListInitialState, {
  /** ===> LIST */
  /** => list process */
  [types.SUPPLIER_LIST_PROCESS](
    state = supplierListInitialState,
    action: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: action.payload.loading,
      error: null,
    };
  },
  /** => list success */
  [types.SUPPLIER_LIST_SUCCESS](
    state = supplierListInitialState,
    action: models.ListSuccessAction<models.SupplierList[]>,
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
  [types.SUPPLIER_LIST_FAILED](
    state = supplierListInitialState,
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
  /** => list reset */
  [types.SUPPLIER_LIST_RESET]() {
    return supplierListInitialState;
  },
  /** => list refresh */
  [types.SUPPLIER_LIST_REFRESH]() {
    return {
      ...supplierListInitialState,
      refresh: true,
    };
  },
  /** => list load more */
  [types.SUPPLIER_LIST_LOADMORE](state = supplierListInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
});
