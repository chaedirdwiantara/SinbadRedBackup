/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT COMPONENT ===  */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE ===  */
import { ProductBundleStyle } from '../../styles';
/** === TYPE === */
interface SectionTitleProps {
  title: string;
  loading?: boolean; // Change to required later
}
/** === COMPONENT === */
export const SectionTitle: FC<SectionTitleProps> = ({ title, loading }) => {
  if (loading) {
    return (
      <SkeletonAnimator>
        <View style={ProductBundleStyle.sectionTitleContainer}>
          <View style={{ height: 8, marginBottom: 8 }} />
          <View style={{ height: 24, marginBottom: 8 }} />
          <View style={{ height: 8 }} />
        </View>
      </SkeletonAnimator>
    );
  }

  return (
    <View style={ProductBundleStyle.sectionTitleContainer}>
      <View style={ProductBundleStyle.sectionTitleContent}>
        <SnbText.B2>{title}</SnbText.B2>
      </View>
    </View>
  );
};
