/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type ProductListInitialProps = models.ProductListItemProps;
/** === INITIAL STATE === */
export const productListInitialState: ProductListInitialProps = {
  data: [],
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  page: 1,
  totalPage: 0,
  total: 0,
  perPage: 10,
};
/** === REDUCER === */
export const productListReducer = simplifyReducer(productListInitialState, {
  /** => Process */
  [types.PRODUCT_LIST_PROCESS](
    state = productListInitialState,
    { payload }: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: payload.loading,
      error: null,
    };
  },
  /** => Succeeded */
  [types.PRODUCT_LIST_SUCCESS](
    state = productListInitialState,
    { payload }: models.ProductListSuccessAction,
  ) {
    return {
      ...state,
      data: [...state.data, ...payload.data],
      loading: false,
      loadMore: false,
      refresh: false,
      error: null,
      total: payload.meta.total,
      totalPage: payload.meta.totalPage,
      page: payload.meta.page,
      perPage: payload.meta.perPage,
    };
  },
  /** => Failed */
  [types.PRODUCT_LIST_FAILED](
    state = productListInitialState,
    { payload }: models.ListFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      loadMore: false,
      refresh: false,
      error: payload,
    };
  },
  /** => Refresh */
  [types.PRODUCT_LIST_REFRESH]() {
    return {
      ...productListInitialState,
      refresh: true,
    };
  },
  /** => Load More */
  [types.PRODUCT_LIST_LOADMORE](state = productListInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
  /** => Reset */
  [types.PRODUCT_LIST_RESET]() {
    return productListInitialState;
  },
  /** => Clear Contents */
  [types.PRODUCT_LIST_CLEAR_CONTENTS]() {
    return {
      ...productListInitialState,
      loading: true,
    };
  },
});
