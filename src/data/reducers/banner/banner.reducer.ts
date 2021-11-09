/** === IMPORT HERE === */
import {
  bannerGeneralInitialState,
  bannerGeneralReducer,
  BannerGeneralInitialProps,
} from './banner-general/banner-general.reducer';
import {
  bannerSliderInitialState,
  bannerSliderReducer,
  BannerSliderInitialProps,
} from './banner-slider/banner-slider.reducer';
/** === TYPE HERE === */
export type BannerInitialProps = {
  bannerGeneral: BannerGeneralInitialProps;
  bannerSlider: BannerSliderInitialProps;
};
/** === INITIAL HERE === */
export const bannerInitialState = {
  bannerGeneral: bannerGeneralInitialState,
  bannerSlider: bannerSliderInitialState,
};
/** === EXPORT ALL HERE === */
export const bannerReducer = (
  { bannerGeneral, bannerSlider }: any,
  action: any,
) => ({
  bannerGeneral: bannerGeneralReducer(bannerGeneral, action),
  bannerSlider: bannerSliderReducer(bannerSlider, action),
});
