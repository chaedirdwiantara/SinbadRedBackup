/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
/** === IMPORT COMPONENTS === */
import { EmptyState } from '@core/components/EmptyState';
import ProductTagList from '../ProductTagList';
import GridLayoutCard from './GridLayoutCard';
import { GridSkeleton } from './GridSkeleton';
/** === IMPORT FUNCTIONS === */
import { scrollHasReachedEnd } from '@core/functions/global/scroll-position';
import { useProductDisplayState } from '@core/functions/product';
/** === IMPORT TYPE === */
import { ProductLayoutProps } from '../product-list-core.type';
/** === COMPONENT === */
const GridLayout: FC<ProductLayoutProps> = ({
  products,
  withTags = true,
  tags,
  onTagPress,
  onOrderPress,
  isRefreshing,
  onRefresh,
  onLoadMore,
  loading,
  error,
}) => {
  /** === HOOK ===  */
  const displayState = useProductDisplayState({
    loading,
    error,
    productsLength: products.length,
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
          flex: displayState === 'empty' ? 1 : undefined,
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
        {(displayState === 'success' || displayState === 'empty') &&
          hasTags && <ProductTagList tags={tags} onTagPress={onTagPress} />}
        {displayState === 'error' && (
          <EmptyState
            title="Terjadi Kesalahan"
            description="Boleh coba refresh lagi?"
          />
        )}
        {displayState === 'empty' && (
          <EmptyState title="Produk Kosong" description="Maaf Produk Kosong" />
        )}
        {displayState === 'success' && (
          <View style={{ flexDirection: 'row', paddingTop: !hasTags ? 14 : 0 }}>
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
        )}
      </ScrollView>
    </View>
  );
};

export default GridLayout;
