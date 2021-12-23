/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type BannerSliderInitialProps = models.SliderItemProps<
  models.BannerSliderSuccessProps[]
>;
/** === INITIAL STATE HERE */
export const bannerSliderListInitialState: BannerSliderInitialProps = {
  data: [],
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const bannerSliderListReducer = simplifyReducer(
  bannerSliderListInitialState,
  {
    /** ===> SLIDER */
    /** => slider process */
    [types.BANNER_SLIDER_PROCESS](state = bannerSliderListInitialState) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => slider success */
    [types.BANNER_SLIDER_SUCCESS](
      state = bannerSliderListInitialState,
      action: models.SliderSuccessAction<models.BannerSliderSuccessProps[]>,
    ) {
      return {
        ...state,
        data: [...action.payload.data],
        loading: false,
      };
    },
    /** => slider failed */
    [types.BANNER_SLIDER_FAILED](
      state = bannerSliderListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
);
