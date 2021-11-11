/** === IMPORT HERE === */
import * as models from '@models';
import {
  bannerSliderListInitialState,
  bannerSliderListReducer,
} from './banner-slider-list.reducer';
/** === TYPE HERE === */
export type BannerSliderInitialProps = models.SliderProps<
  models.BannerSliderSuccessProps[]
>;
/** === INITIAL HERE === */
export const bannerSliderInitialState = {
  list: bannerSliderListInitialState,
};
/** === EXPORT ALL HERE === */
export const bannerSliderReducer = ({ list }: any, action: any) => ({
  list: bannerSliderListReducer(list, action),
});
