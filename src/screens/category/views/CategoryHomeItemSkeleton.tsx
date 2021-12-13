/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE === */
import CategoryHomeStyle from '../styles/category-home.style';
/** === COMPONENT === */
export const CategoryHomeItemSkeleton: FC = () => (
  <SkeletonAnimator>
    <View style={{ alignItems: 'center' }}>
      <View style={CategoryHomeStyle.itemContainer} />
      <View style={CategoryHomeStyle.itemNameSkeletonContainer}>
        <View
          style={[
            CategoryHomeStyle.itemName,
            CategoryHomeStyle.itemNameSkeleton,
          ]}
        />
      </View>
    </View>
  </SkeletonAnimator>
);
