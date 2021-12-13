/** === IMPORT INTERNAL === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE === */
export type BrandListInitialProps = models.ListItemProps<
  models.BrandListItem[]
>;
/** === INITIAL STATE */
export const brandlistInitialState: BrandListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === REDUCER === */
export const brandListReducer = simplifyReducer(brandlistInitialState, {
  /** => Process */
  [types.BRAND_LIST_PROCESS](
    state = brandlistInitialState,
    { payload }: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: payload.loading,
      error: null,
    };
  },
  /** => Succeeded */
  [types.BRAND_LIST_SUCCESS](
    state = brandlistInitialState,
    { payload }: models.ListSuccessAction<models.BrandListItem[]>,
  ) {
    return {
      ...state,
      data: [...state.data, ...payload.data],
      loading: false,
      loadMore: false,
      refresh: false,
      total: payload.meta.total,
      skip: payload.meta.skip,
    };
  },
  /** => Failed */
  [types.BRAND_LIST_FAILED](
    state = brandlistInitialState,
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
  /** => Reset */
  [types.BRAND_LIST_RESET]() {
    return brandlistInitialState;
  },
  /** => Refresh */
  [types.BRAND_LIST_REFRESH]() {
    return {
      ...brandlistInitialState,
      refresh: true,
    };
  },
  /** => Load More */
  [types.BRAND_LIST_LOADMORE](state = brandlistInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
});
