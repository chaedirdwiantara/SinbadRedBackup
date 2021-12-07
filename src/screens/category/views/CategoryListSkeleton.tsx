/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE === */
import CategoryStyle from '../styles/category.style';
/** === COMPONENT === */
export const CategoryListSkeleton: FC = () => (
  <SkeletonAnimator minOpacity={0.5} maxOpacity={0.9}>
    <View style={{ flexDirection: 'row' }}>
      <View style={CategoryStyle.level1SkeletonContainer}>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={CategoryStyle.level1Skeleton} />
          ))}
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={CategoryStyle.level2Skeleton} />
          ))}
      </View>
    </View>
  </SkeletonAnimator>
);
