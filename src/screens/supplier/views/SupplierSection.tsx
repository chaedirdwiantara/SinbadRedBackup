/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, color, styles } from 'react-native-sinbad-ui';
/** === IMPORT STYLE ===  */
import { SupplierStyle } from '../styles';
/** === TYPE === */
interface SupplierSectionProps {
  title: string;
  separator?: boolean;
  topShadow?: boolean;
}
/** === COMPONENTS === */
export const SupplierSection: FC<SupplierSectionProps> = ({
  title,
  separator = true,
  topShadow = true,
  children,
}) => (
  <View>
    {topShadow && (
      <View style={{ height: 10, backgroundColor: color.black5 }} />
    )}
    <View style={styles.shadowForBox10}>
      <View style={SupplierStyle.sectionTitle}>
        <SnbText.B4>{title}</SnbText.B4>
      </View>
      {separator && <View style={SupplierStyle.sectionSeparator} />}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
        {children}
      </View>
    </View>
  </View>
);
