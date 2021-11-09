/** === IMPORT HERE === */
import * as models from '@models';
import {
  bannerGeneralListInitialState,
  bannerGeneralListReducer,
} from './banner-general-list.reducer';
import {
  bannerGeneralDetailInitialState,
  bannerGeneralDetailReducer,
} from './banner-general-detail.reducer';
/** === TYPE HERE === */
export type BannerGeneralInitialProps = models.ListProps<
  models.BannerListSuccessProps[]
> &
  models.DetailProps<models.BannerDetailSuccessProps>;
/** === INITIAL HERE === */
export const bannerGeneralInitialState = {
  list: bannerGeneralListInitialState,
  detail: bannerGeneralDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const bannerGeneralReducer = ({ list, detail }: any, action: any) => ({
  list: bannerGeneralListReducer(list, action),
  detail: bannerGeneralDetailReducer(detail, action),
});
