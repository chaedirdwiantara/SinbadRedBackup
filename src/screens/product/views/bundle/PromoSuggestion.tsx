/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { SnbText } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE ===  */
import { ProductBundleStyle } from '../../styles';
/** === TYPE === */
interface PromoSuggestionProps {
  loading: boolean;
}
/** === COMPONENT === */
export const PromoSuggestion: FC<PromoSuggestionProps> = ({ loading }) => {
  if (loading) {
    return (
      <SkeletonAnimator>
        <View style={{ height: 48, width: '100%' }} />
      </SkeletonAnimator>
    );
  }

  return (
    <View style={{ paddingVertical: 8, height: 56 }}>
      <View style={ProductBundleStyle.promoSuggestionBg} />
      <View style={{ flexDirection: 'row' }}>
        <View style={ProductBundleStyle.promoSuggestionExclamationContainer}>
          <Text style={ProductBundleStyle.promoSuggestionExclamationMark}>
            !
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 8, paddingRight: 8 }}>
          <SnbText.B4>
            Tambahkan produk terkait untuk mendapatkan bundle promosi!
          </SnbText.B4>
        </View>
      </View>
    </View>
  );
};
