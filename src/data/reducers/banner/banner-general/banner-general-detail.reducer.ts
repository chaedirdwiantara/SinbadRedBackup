/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type BannerDetailInitialProps =
  models.DetailItemProps<models.BannerDetailSuccessProps>;
/** === INITIAL STATE HERE */
export const bannerGeneralDetailInitialState: BannerDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const bannerGeneralDetailReducer = simplifyReducer(
  bannerGeneralDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.BANNER_DETAIL_PROCESS](state = bannerGeneralDetailInitialState) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => detail success */
    [types.BANNER_DETAIL_SUCCESS](
      state = bannerGeneralDetailInitialState,
      action: models.DetailSuccessAction<models.BannerDetailSuccessProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.BANNER_DETAIL_FAILED](
      state = bannerGeneralDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => banner reset */
    [types.BANNER_DETAIL_RESET]() {
      return bannerGeneralDetailInitialState;
    },
  },
);
