/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ProductListInitialProps = models.ListItemProps<models.ProductList[]>;
/** === INITIAL STATE HERE === */
export const productListInitialState: ProductListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const productListReducer = simplifyReducer(productListInitialState, {
  /** ===> LIST */
  /** => list process */
  [types.PRODUCT_LIST_PROCESS](
    state = productListInitialState,
    action: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: action.payload.loading,
      error: null,
    };
  },
  /** => list success */
  [types.PRODUCT_LIST_SUCCESS](
    state = productListInitialState,
    action: models.ListSuccessAction<models.ProductList[]>,
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
  [types.PRODUCT_LIST_FAILED](
    state = productListInitialState,
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
  [types.PRODUCT_LIST_RESET]() {
    return productListInitialState;
  },
  /** => list refresh */
  [types.PRODUCT_LIST_REFRESH]() {
    return {
      ...productListInitialState,
      refresh: true,
    };
  },
  /** => list load more */
  [types.PRODUCT_LIST_LOADMORE](state = productListInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
});
