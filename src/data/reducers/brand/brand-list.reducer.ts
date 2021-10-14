/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type BrandListInitialProps = models.ListItemProps<
  models.BrandListSuccessProps[]
>;
/** === INITIAL STATE HERE */
export const brandlistInitialState: BrandListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const brandListReducer = simplifyReducer(brandlistInitialState, {
  /** ===> LIST */
  /** => list process */
  [types.BRAND_LIST_PROCESS](
    state = brandlistInitialState,
    action: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: action.payload.loading,
      error: null,
    };
  },
  /** => list success */
  [types.BRAND_LIST_SUCCESS](
    state = brandlistInitialState,
    action: models.ListSuccessAction<models.BrandListSuccessProps[]>,
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
  [types.BRAND_LIST_FAILED](
    state = brandlistInitialState,
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
  [types.BRAND_LIST_RESET]() {
    return brandlistInitialState;
  },
  /** => list refresh */
  [types.BRAND_LIST_REFRESH]() {
    return {
      ...brandlistInitialState,
      refresh: true,
    };
  },
  /** => list load more */
  [types.BRAND_LIST_LOADMORE](state = brandlistInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
});
