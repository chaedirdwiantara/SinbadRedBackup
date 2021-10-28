/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
/** === IMPORT COMPONENTS === */
import ProductTagList from '../ProductTagList';
import GridLayoutCard from './GridLayoutCard';
/** === IMPORT FUNCTION === */
import { scrollHasReachedEnd } from '@core/functions/global/scroll-position';
/** === IMPORT TYPE === */
import { ProductLayoutProps } from '../product-list-core.type';
/** === COMPONENT === */
const GridLayout: FC<ProductLayoutProps> = ({
  products,
  tags,
  onTagPress,
  onOrderPress,
  isRefreshing,
  onRefresh,
  onLoadMore,
}) => (
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
      <ProductTagList tags={tags} onTagPress={onTagPress} />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          {products.map(
            (product, productIndex) =>
              productIndex % 2 === 0 && (
                <GridLayoutCard
                  product={product}
                  index={productIndex}
                  onOrderPress={onOrderPress}
                />
              ),
          )}
        </View>
        <View style={{ flex: 1 }}>
          {products.map(
            (product, productIndex) =>
              productIndex % 2 === 1 && (
                <GridLayoutCard
                  product={product}
                  index={productIndex}
                  onOrderPress={onOrderPress}
                />
              ),
          )}
        </View>
      </View>
    </ScrollView>
  </View>
);

export default GridLayout;
