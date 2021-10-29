/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { View } from 'react-native';
/** === IMPORT STYLE HERE === */
/** === IMPORT FUNCTION HERE === */
import { goToBannerDetail, goToBanner } from '../functions';

/** === IMPORT EXTERNAL COMPONENT HERE === */
import BannerSlider from '@core/components/BannerSlider';
/** === INTERFACE === */
interface Props {
  testID?: string;
}
/** === COMPONENT === */
const BannerHomeView: React.FC<Props> = () => {
  /** => main */
  return (
    <View testID={'bannerHome'}>
      <BannerSlider
        goToDetail={() => goToBannerDetail()}
        data={[
          {
            imageUrl:
              'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/dummy_images/ovaltine_banner.png',
            id: '1',
            promo: null,
          },
          {
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/promo/Promo+banner+dua+belibis+buy+2+get+1+-+new.png',
            id: '2',
            promo: null,
          },
          {
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/promo/banner+promo+wipol-1.png',
            id: '3',
            promo: null,
          },
        ]}
        loading={false}
        seeAll={() => goToBanner()}
      />
    </View>
  );
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
