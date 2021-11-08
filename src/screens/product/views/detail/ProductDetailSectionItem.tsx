/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
/** === TYPE ===  */
interface ProductDetailSectionItemProps {
  name: string;
  value: string;
  bottomSpaces?: number;
}
/** === COMPONENT ===  */
export const ProductDetailSectionItem: FC<ProductDetailSectionItemProps> = ({
  name,
  value,
  bottomSpaces = 6,
}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: bottomSpaces,
    }}>
    <View style={{ flex: 1, alignItems: 'flex-start' }}>
      <SnbText.B3>{name}</SnbText.B3>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <SnbText.B3>{value}</SnbText.B3>
    </View>
  </View>
);
