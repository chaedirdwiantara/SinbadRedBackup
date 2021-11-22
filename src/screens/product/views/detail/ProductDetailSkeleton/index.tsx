/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { color } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import { ProductDetailSupplierInfoSkeleton } from './ProductDetailSupplierInfoSkeleton';
import { ProductDetailSectionSkeleton } from './ProductDetailSectionSkeleton';
import { ProductDetailMainSkeleton } from './ProductDetailMainSkeleton';
/** === COMPONENT === */
export const ProductDetailSkeleton: FC = () => (
  <View style={{ flex: 1, backgroundColor: color.white }}>
    <ProductDetailMainSkeleton />
    <ProductDetailSupplierInfoSkeleton />
    <ProductDetailSectionSkeleton />
    <ProductDetailSectionSkeleton />
  </View>
);
