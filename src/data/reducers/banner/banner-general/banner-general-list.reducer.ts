/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type BannerListInitialProps = models.ListItemProps<
  models.BannerListSuccessProps[]
>;
/** === INITIAL STATE HERE */
export const bannerGeneralListInitialState: BannerListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const bannerGeneralListReducer = simplifyReducer(
  bannerGeneralListInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.BANNER_LIST_PROCESS](
      state = bannerGeneralListInitialState,
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
      state = bannerGeneralListInitialState,
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
      state = bannerGeneralListInitialState,
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
      return bannerGeneralListInitialState;
    },
    /** => list refresh */
    [types.BANNER_LIST_REFRESH]() {
      return {
        ...bannerGeneralListInitialState,
        refresh: true,
      };
    },
    /** => list load more */
    [types.BANNER_LIST_LOADMORE](state = bannerGeneralListInitialState) {
      return {
        ...state,
        loadMore: true,
      };
    },
  },
);
