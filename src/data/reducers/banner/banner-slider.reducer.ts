/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type BannerSliderInitialProps = models.ListItemProps<
  models.BannerSliderSuccessProps[]
>;
/** === INITIAL STATE HERE */
export const bannerSliderInitialState: BannerSliderInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const bannerSliderReducer = simplifyReducer(bannerSliderInitialState, {
  /** ===> SLIDER */
  /** => slider process */
  [types.BANNER_SLIDER_PROCESS](
    state = bannerSliderInitialState,
    action: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: action.payload.loading,
      error: null,
    };
  },
  /** => slider success */
  [types.BANNER_SLIDER_SUCCESS](
    state = bannerSliderInitialState,
    action: models.ListSuccessAction<models.BannerSliderSuccessProps[]>,
  ) {
    return {
      ...state,
      data: [...state.data, ...action.payload.data],
      loading: false,
    };
  },
  /** => slider failed */
  [types.BANNER_SLIDER_FAILED](
    state = bannerSliderInitialState,
    action: models.ListFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
});
