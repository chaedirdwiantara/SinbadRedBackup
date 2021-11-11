/** === IMPORT PACKAGES ===  */
import React from 'react';
import { View } from 'react-native';
import { SnbIcon, SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { ProductDetailStyle } from '@screen/product/styles';
/** === COMPONENT ===  */
export const ExclusiveTag = () => (
  <View style={ProductDetailStyle.exclusiveTagContainer}>
    <SnbIcon
      name="stars"
      color={color.yellow50}
      size={18}
      style={{ marginRight: 4 }}
    />
    <SnbText.C1 color={color.yellow50}>Exclusive</SnbText.C1>
  </View>
);
