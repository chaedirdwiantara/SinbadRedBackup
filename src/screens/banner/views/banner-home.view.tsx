/** === IMPORT PACKAGE HERE === */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === IMPORT STYLE HERE === */
import BannerStyle from '../styles/banner.style';
/** === INTERFACE === */
interface Props {
  testID?: string;
}
/** === COMPONENT === */
const BannerHomeView: FC<Props> = () => {
  /** === HOOK === */
  /** => main */
  return (
    <View style={BannerStyle.bannerHomeContainer} testID={'bannerHome'}>
      <TouchableOpacity>
        <SnbText.B1>Banner Here</SnbText.B1>
      </TouchableOpacity>
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
