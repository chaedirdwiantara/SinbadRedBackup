/** === IMPORT HERE === */
import * as models from '@models';
import {
  bannerSliderInitialState,
  bannerSliderReducer,
} from './banner-slider.reducer';
import {
  bannerListInitialState,
  bannerListReducer,
} from './banner-list.reducer';
import {
  bannerDetailInitialState,
  bannerDetailReducer,
} from './banner-detail.reducer';
/** === TYPE HERE === */
export type BannerInitialProps = models.ListProps<
  models.BannerSliderSuccessProps[]
> &
  models.ListProps<models.BannerListSuccessProps[]> &
  models.DetailProps<models.BannerDetailSuccessProps>;
/** === INITIAL HERE === */
export const bannerInitialState = {
  listSlider: bannerSliderInitialState,
  list: bannerListInitialState,
  detail: bannerDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const bannerReducer = (
  { listSlider, list, detail }: any,
  action: any,
) => ({
  listSlider: bannerSliderReducer(listSlider, action),
  list: bannerListReducer(list, action),
  detail: bannerDetailReducer(detail, action),
});
