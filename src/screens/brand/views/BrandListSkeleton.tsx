/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, FlatList } from 'react-native';
/** === IMPORT COMPONENT === */
import { Content, spacingV2 } from 'react-native-sinbad-ui';
// import { BrandCardSkeleton } from '@core/components/product/HorizontalBrandSkeleton';
/** === IMPORT STYLES === */
// import BrandStyle from '../styles/brand.style';
/** === CONSTANTS === */
const list = Array(20).fill(0);
const { spacing } = spacingV2;
/** === COMPONENT === */
export const BrandListSkeleton: FC = () => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={list}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      contentContainerStyle={{
        paddingTop: spacing.sm,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.md,
      }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={() => (
        <View style={{ padding: spacing.lg }}>
          <Content.NewBrand.Square loading={true} image="" name="" />
        </View>
      )}
    />
  </View>
);
