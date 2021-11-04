/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type BannerListInitialProps = models.ListItemProps<
  models.BannerListSuccessProps[]
>;
/** === INITIAL STATE HERE */
export const bannerListInitialState: BannerListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const bannerListReducer = simplifyReducer(bannerListInitialState, {
  /** ===> LIST */
  /** => list process */
  [types.BANNER_LIST_PROCESS](
    state = bannerListInitialState,
    action: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: action.payload.loading,
      error: null,
    };
  },
  /** => list success */
  [types.BANNER_LIST_SUCCESS](
    state = bannerListInitialState,
    action: models.ListSuccessAction<models.BannerListSuccessProps[]>,
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
  [types.BANNER_LIST_FAILED](
    state = bannerListInitialState,
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
  [types.BANNER_LIST_RESET]() {
    return bannerListInitialState;
  },
  /** => list refresh */
  [types.BANNER_LIST_REFRESH]() {
    return {
      ...bannerListInitialState,
      refresh: true,
    };
  },
  /** => list load more */
  [types.BANNER_LIST_LOADMORE](state = bannerListInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
});
