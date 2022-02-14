/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, FlatList } from 'react-native';
/** === IMPORT COMPONENT === */
import { ProductGridCard } from '@core/components/ProductGridCard';
import { HorizontalGridSkeleton } from '@core/components/product/HorizontalGridSkeleton';
/** === IMPORT FUNCTION === */
import { goToProductDetail } from '@core/functions/product';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === TYPE === */
interface HorizontalProductGridLayoutProps {
  data: Array<models.ProductList>;
  loading: boolean;
  withOrderButton?: boolean;
  onEndReached?: () => void;
  onCardPress?: (item: models.ProductList, index: number) => void;
  onOrderPress?: (item: models.ProductList, index: number) => void;
}
/** === COMPONENT === */
export const HorizontalProductGridLayout: FC<
  HorizontalProductGridLayoutProps
> = ({
  data,
  loading,
  withOrderButton = false,
  onEndReached,
  onCardPress,
  onOrderPress,
}) => {
  /** === VIEW === */
  /** === Product Card === */
  const renderProductCard = ({
    item,
    index,
  }: {
    item: models.ProductList;
    index: number;
  }) => (
    <View
      key={index}
      style={{
        width: 160,
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === data.length - 1 ? 16 : 0,
      }}>
      <ProductGridCard
        flexOne={true}
        name={item.name}
        imageUrl={item.thumbnail}
        finalPrice={item.finalPrice}
        isBundle={item.isBundle}
        isPromo={item.isPromo}
        isExclusive={item.isExclusive}
        onCardPress={() => {
          if (onCardPress) {
            onCardPress(item, index);
          } else {
            goToProductDetail(item.id);
          }
        }}
        withOrderButton={withOrderButton}
        onOrderPress={() => onOrderPress?.(item, index)}
      />
    </View>
  );
  /** => Main */
  return loading ? (
    <HorizontalGridSkeleton />
  ) : (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderProductCard}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      onEndReached={onEndReached}
    />
  );
};
