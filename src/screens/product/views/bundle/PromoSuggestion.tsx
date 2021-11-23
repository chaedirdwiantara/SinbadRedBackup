/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { SnbText } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { ProductBundleStyle } from '../../styles';
/** === COMPONENT === */
export const PromoSuggestion: FC = () => (
  <View style={{ paddingVertical: 8, height: 56 }}>
    <View style={ProductBundleStyle.promoSuggestionBg} />
    <View style={{ flexDirection: 'row' }}>
      <View style={ProductBundleStyle.promoSuggestionExclamationContainer}>
        <Text style={ProductBundleStyle.promoSuggestionExclamationMark}>!</Text>
      </View>
      <View style={{ flex: 1, marginLeft: 8, paddingRight: 8 }}>
        <SnbText.B4>
          Tambahkan produk terkait untuk mendapatkan bundle promosi!
        </SnbText.B4>
      </View>
    </View>
  </View>
);
