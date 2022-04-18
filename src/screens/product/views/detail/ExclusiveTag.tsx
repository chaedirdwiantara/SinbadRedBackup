/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { SnbIcon, SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { ProductDetailStyle } from '@screen/product/styles';
/** === COMPONENT ===  */
export const ExclusiveTag: FC<ViewProps> = (props) => (
  <View style={[ProductDetailStyle.exclusiveTagContainer, props.style]}>
    <SnbIcon
      name="stars"
      color={color.yellow50}
      size={18}
      style={{ marginRight: 4 }}
    />
    <SnbText.C1 color={color.yellow50}>Exclusive</SnbText.C1>
  </View>
);
