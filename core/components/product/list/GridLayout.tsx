/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
/** === IMPORT COMPONENTS === */
import { ProductGridCard } from '@core/components/ProductGridCard';
import ProductTagList from './ProductTagList';
/** === IMPORT FUNCTION === */
import { scrollHasReachedEnd } from '@core/functions/global/scroll-position';
import { goToProductDetail } from '@core/functions/product';
/** === IMPORT TYPES === */
import * as models from '@models';
import { ProductLayoutProps } from './product-list-core.type';
/** === COMPONENT === */
const GridLayout: FC<ProductLayoutProps> = ({
  products,
  tags,
  onTagPress,
  onOrderPress,
  isRefreshing,
  onRefresh,
  onLoadMore,
}) => {
  /** === VIEW === */
  /** => Tag List */
  const renderTagList = () => (
    <ProductTagList tags={tags} onTagPress={onTagPress} />
  );
  /** => Grid Card */
  const renderGridCard = (item: models.ProductList, index: number) => {
    return (
      <View
        key={index}
        style={{
          marginRight: index % 2 === 0 ? 8 : 16,
          marginLeft: index % 2 === 0 ? 16 : 0,
          marginBottom: 4,
        }}>
        <ProductGridCard
          flexOne={true}
          name={item.name}
          imageUrl={item.thumbnail ?? item.image}
          price={item.currentPrice ?? 0}
          isBundle={item.isBundle}
          isPromo={item.isPromo}
          isExclusive={item.isExclusive}
          onCardPress={() => {
            // Fetch product detail
            console.log({ productId: item.id });
            goToProductDetail();
          }}
          withOrderButton={true}
          onOrderPress={() => onOrderPress(item)}
        />
      </View>
    );
  };
  /** => Grid List */
  const renderGridList = () => (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        {products.map(
          (product, productIndex) =>
            productIndex % 2 === 0 && renderGridCard(product, productIndex),
        )}
      </View>
      <View style={{ flex: 1 }}>
        {products.map(
          (product, productIndex) =>
            productIndex % 2 === 1 && renderGridCard(product, productIndex),
        )}
      </View>
    </View>
  );
  /** => Main */
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
        {renderTagList()}
        {renderGridList()}
      </ScrollView>
    </View>
  );
};

export default GridLayout;
