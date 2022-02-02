/** === IMPORT PACKAGE HERE === */
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
/** === IMPORT STYLE HERE === */
/** === IMPORT FUNCTION HERE === */
import { goToBannerDetail, goToBanner, useBannerAction } from '../functions';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import BannerSlider from '@core/components/BannerSlider';
/** === INTERFACE === */
interface Props {
  testID?: string;
}
/** === COMPONENT === */
const BannerHomeView: React.FC<Props> = () => {
  /** === STATE === */
  const { stateBanner, dispatchBanner } = useContext(contexts.BannerContext);
  const bannerAction = useBannerAction();
  const bannerSliderState = stateBanner.bannerSlider.list;
  /** === HOOK === */
  /** => effect */
  useEffect(() => {
    bannerAction.slider(dispatchBanner);
  }, []);
  console.log('data:', stateBanner);
  
  /** => main */
  /** => content */
  const content = () => {
    return (
      <BannerSlider
        goToDetail={(data) => goToBannerDetail(data.id)}
        data={bannerSliderState.data}
        loading={bannerSliderState.loading}
        seeAll={() => goToBanner()}
      />
    );
  };
  return <View testID={'bannerHome'}>{content()}</View>;
};

export default BannerHomeView;

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
