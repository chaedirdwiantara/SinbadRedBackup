/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
/** === IMPORT COMPONENT === */
import { BrandCardSkeleton } from '@core/components/product/HorizontalBrandSkeleton';
/** === IMPORT STYLES === */
import BrandStyle from '../styles/brand.style';
/** === CONSTANTS === */
const { width } = Dimensions.get('window');
/** === COMPONENT === */
export const BrandListSkeleton: FC = () => (
  <View style={{ flex: 1 }}>
    <ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={BrandStyle.skeletonContainer}>
      {Array(20)
        .fill(0)
        .map((_, index) => (
          <BrandCardSkeleton
            key={index}
            height={0.25 * width}
            width={0.22 * width}
            bottomSpaces={14}
          />
        ))}
    </ScrollView>
  </View>
);
