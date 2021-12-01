/** === IMPORT PACKAGES ===  */
import React from 'react';
import { View } from 'react-native';
import { SnbIcon, SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { UnavailableSkuFlagStyle } from '@core/styles';
/** === COMPONENT ===  */
export const UnavailableSkuFlag = () => (
  <View style={UnavailableSkuFlagStyle.container}>
    <SnbIcon name="error" size={20} color={color.red50} />
    <View style={{ marginLeft: 8 }}>
      <SnbText.C1>
        SKU tidak tersedia di lokasi Anda. Silahkan pilih SKU lain yang tersedia
      </SnbText.C1>
    </View>
  </View>
);
