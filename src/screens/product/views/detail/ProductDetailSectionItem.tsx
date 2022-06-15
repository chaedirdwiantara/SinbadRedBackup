/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbText2, spacingV2, colorV2 } from 'react-native-sinbad-ui';
/** === TYPE ===  */
interface ProductDetailSectionItemProps {
  name: string;
  value: string;
  bottomSpaces?: number;
}
/** Var */
const { textColor } = colorV2;
const { spacing } = spacingV2;
/** === COMPONENT ===  */
export const ProductDetailSectionItem: FC<ProductDetailSectionItemProps> = ({
  name,
  value,
  bottomSpaces = spacing.xxsm,
}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: bottomSpaces,
    }}>
    <View style={{ flex: 1, alignItems: 'flex-start' }}>
      <SnbText2.Paragraph.Small color={textColor.secondary}>
        {name}
      </SnbText2.Paragraph.Small>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <SnbText2.Paragraph.Small color={textColor.secondary}>
        {value}
      </SnbText2.Paragraph.Small>
    </View>
  </View>
);
