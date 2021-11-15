/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Dimensions } from 'react-native';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === CONSTANT === */
const { width } = Dimensions.get('window');
/** === COMPONENT === */
export const ProductDetailMainSkeleton: FC = () => (
  <SkeletonAnimator>
    <View style={{ height: width, width: '100%' }} />
    <View style={{ padding: 16, paddingBottom: 8 }}>
      <View style={{ height: 16, width: '80%', borderRadius: 15 }} />
      <View
        style={{ height: 16, width: '30%', borderRadius: 15, marginTop: 8 }}
      />
    </View>
  </SkeletonAnimator>
);
