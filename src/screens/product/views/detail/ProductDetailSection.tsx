/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SnbText,
  color,
  SnbText2,
  colorV2,
  spacingV2,
  Text,
  SnbDivider2,
} from 'react-native-sinbad-ui';
/** === IMPORT STYLE === */
import { ProductDetailStyle } from '@screen/product/styles';
/** === TYPE === */
interface ProductDetailSectionProps {
  title: string;
  separator?: boolean;
}
/** VAR */
const { spacing } = spacingV2;
const { bgColor, strokeColor } = colorV2;
/** === COMPONENT === */
export const ProductDetailSection: FC<ProductDetailSectionProps> = ({
  title,
  separator = true,
  children,
}) => (
  <View>
    <View style={styles.spacingDiv} />
    <View>
      <View style={styles.sectionTitle}>
        <Text.Title text={title} />
      </View>
      {separator && <View style={styles.sectionSeparator} />}
      <View style={styles.children}>{children}</View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  spacingDiv: { height: spacing.sm, backgroundColor: bgColor.neutral },
  children: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionSeparator: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderTopWidth: 1,
    borderColor: strokeColor.default,
  },
});
