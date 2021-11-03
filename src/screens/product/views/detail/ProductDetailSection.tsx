/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color, styles } from 'react-native-sinbad-ui';
/** === IMPORT STYLE === */
import { ProductDetailStyle } from '@screen/product/styles';
/** === TYPE === */
interface ProductDetailSectionProps {
  title: string;
  separator?: boolean;
}
/** === COMPONENT === */
export const ProductDetailSection: FC<ProductDetailSectionProps> = ({
  title,
  separator = true,
  children,
}) => (
  <View>
    <View style={{ height: 10, backgroundColor: color.black5 }} />
    <View style={styles.shadowForBox10}>
      <View style={ProductDetailStyle.sectionTitle}>
        <SnbText.B4>{title}</SnbText.B4>
      </View>
      {separator && <View style={ProductDetailStyle.sectionSeparator} />}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {children}
      </View>
    </View>
  </View>
);
