/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE ===  */
import { ProductDetailStyle } from '@screen/product/styles';
/** === CONSTANT === */
const textStyle = {
  height: 12,
  borderRadius: 15,
};
/** === COMPONENT === */
export const ProductDetailSectionSkeleton: FC = () => (
  <View style={{ marginBottom: 8 }}>
    <SkeletonAnimator>
      <View style={{ paddingVertical: 16 }}>
        <View
          style={{
            width: '70%',
            marginHorizontal: 16,
            ...textStyle,
          }}
        />
        <View style={ProductDetailStyle.sectionSeparatorSkeleton} />
      </View>
      <View style={ProductDetailStyle.sectionItemSkeleton}>
        <View style={{ width: '20%', ...textStyle }} />
        <View style={{ width: '50%', ...textStyle }} />
      </View>
      <View style={ProductDetailStyle.sectionItemSkeleton}>
        <View style={{ width: '30%', ...textStyle }} />
        <View style={{ width: '45%', ...textStyle }} />
      </View>
      <View style={ProductDetailStyle.sectionItemSkeleton}>
        <View style={{ width: '25%', ...textStyle }} />
        <View style={{ width: '55%', ...textStyle }} />
      </View>
    </SkeletonAnimator>
  </View>
);
