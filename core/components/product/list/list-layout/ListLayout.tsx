/** === IMPORT PACKAGES ===  */
import React, { FC, memo } from 'react';
import { View, FlatList, ScrollView, RefreshControl } from 'react-native';
/** === IMPORT COMPONENTS === */
import { spacingV2 } from '@sinbad/react-native-sinbad-ui';
import { EmptyState } from '@core/components/EmptyState';
import { ProductListCard } from '@core/components/ProductListCard';
import { ListSkeleton } from './ListSkeleton';
/** === IMPORT FUNCTIONS === */
import {
  goToProductDetail,
  useListDisplayState,
} from '@core/functions/product';
/** === IMPORT TYPES === */
import * as models from '@models';
import { ProductLayoutProps } from '../product-list-core.type';

// var
const { spacing } = spacingV2;

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
  total,
  onChangeLayoutListPress,
  onFilterPress,
  onSortPress,
}) => {
  /** === HOOK ===  */
  const displayState = useListDisplayState({
    loading,
    error,
    dataLength: products.length,
  });
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
      <View
        key={index}
        style={{
          alignItems: 'center',
          marginBottom: spacing.xl,
        }}>
        <ProductListCard
          name={item.name}
          imageUrl={item.thumbnail}
          priceAfterTax={item.priceAfterTax}
          hasBulkPrice={item.hasBulkPrice}
          qtySoldLabel={item.qtySoldLabel}
          isExclusive={item.isExclusive}
          onCardPress={() => {
            goToProductDetail(`${item.id}_${item.warehouseOriginId}`);
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

export default memo(ListLayout);
