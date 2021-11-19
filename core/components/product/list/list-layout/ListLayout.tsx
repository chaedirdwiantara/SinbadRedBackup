/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, FlatList, ScrollView, RefreshControl } from 'react-native';
/** === IMPORT COMPONENTS === */
import { EmptyState } from '@core/components/EmptyState';
import { ProductListCard } from '@core/components/ProductListCard';
import ProductTagList from '../ProductTagList';
import { ListSkeleton } from './ListSkeleton';
/** === IMPORT FUNCTIONS === */
import {
  goToProductDetail,
  useProductDisplayState,
} from '@core/functions/product';
/** === IMPORT TYPES === */
import * as models from '@models';
import { ProductLayoutProps } from '../product-list-core.type';
/** === COMPONENT === */
const ListLayout: FC<ProductLayoutProps> = ({
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
  /** === DERIVED === */
  const hasTags = withTags && tags.length > 0;
  const tagList = hasTags ? (
    <ProductTagList tags={tags} onTagPress={onTagPress} />
  ) : null;
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
          imageUrl={item.thumbnail}
          currentPrice={item.currentPrice}
          isBundle={item.isBundle}
          isPromo={item.isPromo}
          isExclusive={item.isExclusive}
          onCardPress={() => {
            goToProductDetail(item.id);
          }}
          withOrderButton={true}
          onOrderPress={() => onOrderPress(item)}
        />
      </View>
    );
  };
  /** => Loading */
  if (displayState === 'loading') {
    return <ListSkeleton />;
  }
  /** => Error */
  if (displayState === 'error') {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          <EmptyState
            title="Terjadi Kesalahan"
            description="Boleh coba refresh lagi?"
          />
        </ScrollView>
      </View>
    );
  }
  /** => Empty */
  if (displayState === 'empty') {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }>
          {tagList}
          <EmptyState title="Produk Kosong" description="Maaf Produk Kosong" />
        </ScrollView>
      </View>
    );
  }
  /** => Main */
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{
          paddingBottom: 24,
          paddingTop: !withTags ? 14 : 0,
        }}
        ListHeaderComponent={tagList}
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
