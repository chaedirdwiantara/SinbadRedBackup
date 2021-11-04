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
/** === TYPE HERE === */
export type BannerInitialProps = models.ListProps<
  models.BannerSliderSuccessProps[]
> &
  models.ListProps<models.BannerListSuccessProps[]>;
/** === INITIAL HERE === */
export const bannerInitialState = {
  listSlider: bannerSliderInitialState,
  list: bannerListInitialState,
};
/** === EXPORT ALL HERE === */
export const bannerReducer = ({ listSlider, list }: any, action: any) => ({
  listSlider: bannerSliderReducer(listSlider, action),
  list: bannerListReducer(list, action),
});
