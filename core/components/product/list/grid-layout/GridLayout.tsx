/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
/** === IMPORT COMPONENTS === */
import { EmptyState } from '@core/components/EmptyState';
import ProductTagList from '../ProductTagList';
import GridLayoutCard from './GridLayoutCard';
import { GridSkeleton } from './GridSkeleton';
/** === IMPORT FUNCTION === */
import { scrollHasReachedEnd } from '@core/functions/global/scroll-position';
/** === IMPORT TYPE === */
import { ProductLayoutProps } from '../product-list-core.type';
/** === COMPONENT === */
const GridLayout: FC<ProductLayoutProps> = ({
  products,
  tags,
  onTagPress,
  tagListComponentKey,
  onOrderPress,
  isRefreshing,
  onRefresh,
  onLoadMore,
  loading,
}) => {
  if (loading) {
    return <GridSkeleton />;
  }

  if (!loading && products.length === 0) {
    return (
      <EmptyState title="Produk Kosong" description="Maaf Produk Kosong" />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onScroll={({ nativeEvent }) => {
          if (scrollHasReachedEnd(nativeEvent)) {
            onLoadMore();
          }
        }}
        scrollEventThrottle={10}>
        <ProductTagList
          key={tagListComponentKey}
          tags={tags}
          onTagPress={onTagPress}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            {products.map(
              (product, productIndex) =>
                productIndex % 2 === 0 && (
                  <GridLayoutCard
                    key={product.id}
                    product={product}
                    index={productIndex}
                    onOrderPress={() => onOrderPress(product)}
                  />
                ),
            )}
          </View>
          <View style={{ flex: 1 }}>
            {products.map(
              (product, productIndex) =>
                productIndex % 2 === 1 && (
                  <GridLayoutCard
                    key={product.id}
                    product={product}
                    index={productIndex}
                    onOrderPress={() => onOrderPress(product)}
                  />
                ),
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GridLayout;
