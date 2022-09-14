/** === IMPORT PACKAGES ===  */
import React, { FC, memo } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
/** === IMPORT COMPONENTS === */
import { EmptyState } from '@core/components/EmptyState';
import GridLayoutCard from './GridLayoutCard';
import { GridSkeleton } from './GridSkeleton';
/** === IMPORT FUNCTIONS === */
import { scrollHasReachedEnd } from '@core/functions/global/scroll-position';
import { useListDisplayState } from '@core/functions/product';
/** === IMPORT TYPE === */
import { ProductLayoutProps } from '../product-list-core.type';
/** === COMPONENT === */
const GridLayout: FC<ProductLayoutProps> = ({
  testID,
  products,
  withTags = true,
  tags,
  onOrderPress,
  isRefreshing,
  onRefresh,
  onLoadMore,
  loading,
  error,
  onCardPress,
}) => {
  /** === HOOK ===  */
  const displayState = useListDisplayState({
    loading,
    error,
    dataLength: products.length,
  });
  /** === DERIVED ===  */
  const hasTags = withTags && tags.length > 0;
  /** === VIEW ===  */
  if (displayState === 'loading') {
    return <GridSkeleton />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flex:
            displayState === 'empty' || displayState === 'error'
              ? 1
              : undefined,
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onScroll={({ nativeEvent }) => {
          if (scrollHasReachedEnd(nativeEvent)) {
            onLoadMore();
          }
        }}
        scrollEventThrottle={10}>
        {displayState === 'error' && (
          <EmptyState
            testID={testID}
            title="Terjadi Kesalahan"
            description="Boleh coba refresh lagi?"
          />
        )}
        {displayState === 'empty' && (
          <EmptyState
            testID={testID}
            title="Produk Kosong"
            description="Maaf Produk Kosong"
          />
        )}
        {displayState === 'success' && (
          <View
            style={{
              flexDirection: 'row',
              paddingTop: !hasTags ? 14 : 0,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              {products.map(
                (product, productIndex) =>
                  productIndex % 2 === 0 && (
                    <GridLayoutCard
                      testID={testID}
                      key={`${product.id}_${product.warehouseOriginId}`}
                      product={product}
                      index={productIndex}
                      onCardPress={onCardPress}
                      onOrderPress={() => onOrderPress(product)}
                    />
                  ),
              )}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              {products.map(
                (product, productIndex) =>
                  productIndex % 2 === 1 && (
                    <GridLayoutCard
                      testID={testID}
                      key={`${product.id}_${product.warehouseOriginId}`}
                      product={product}
                      index={productIndex}
                      onCardPress={onCardPress}
                      onOrderPress={() => onOrderPress(product)}
                    />
                  ),
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default memo(GridLayout);
