/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, FlatList } from 'react-native';
/** === IMPORT COMPONENTS === */
import { ProductListCard } from '@core/components/ProductListCard';
import ProductTagList from './ProductTagList';
/** === IMPORT FUNCTION === */
import { goToProductDetail } from '@core/functions/product';
/** === IMPORT TYPES === */
import * as models from '@models';
import { ProductLayoutProps } from './product-list-core.type';
/** === COMPONENT === */
const ListLayout: FC<ProductLayoutProps> = ({
  products,
  tags,
  onTagPress,
  onOrderPress,
  isRefreshing,
  onRefresh,
  onLoadMore,
}) => {
  /** === VIEW === */
  /** => List Card */
  const renderListCard = ({
    item,
    index,
  }: {
    item: models.ProductList;
    index: number;
  }) => {
    return (
      <View key={index} style={{ minHeight: 100, marginHorizontal: 16 }}>
        <ProductListCard
          name={item.name}
          imageUrl={item.thumbnail ?? item.image}
          price={item.currentPrice ?? 0}
          isBundle={item.isBundle}
          isPromo={item.isPromo}
          isExclusive={item.isExclusive}
          onCardPress={() => {
            // Fetch product detail
            goToProductDetail();
          }}
          withOrderButton={true}
          onOrderPress={() => onOrderPress(item)}
        />
      </View>
    );
  };
  /** => Main */
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 24 }}
        ListHeaderComponent={
          <ProductTagList tags={tags} onTagPress={onTagPress} />
        }
        data={products}
        renderItem={renderListCard}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.1}
        onEndReached={onLoadMore}
        showsVerticalScrollIndicator={true}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default ListLayout;
