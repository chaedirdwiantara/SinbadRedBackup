/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => banner slider */
const bannerSlider = () => {
  const path = 'banners/slider';
  return apiMapping<models.BannerSliderSuccessProps[]>(
    'public',
    path,
    'banner',
    'v1',
    'LIST',
  );
};
/** => banner list */
const bannerList = (data: models.ListProcessProps) => {
  // const mockHost = 'https://9a61fb00-ff35-40cf-983a-0a780d50cded.mock.pstmn.io';
  const path = `banners?limit=${data.limit}&skip=${data.skip}&keyword=${data.search}`;
  return apiMapping<models.BannerListSuccessProps[]>(
    'public',
    path,
    'banner',
    'v1',
    'LIST',
  );
};
/** === EXPORT FUNCTIONS === */
export const BannerApi = {
  bannerSlider,
  bannerList,
};
