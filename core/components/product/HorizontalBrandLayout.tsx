/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View, FlatList } from 'react-native';
/** === IMPORT COMPONENT === */
import { BrandCard } from '@core/components/BrandCard';
import { HorizontalBrandSkeleton } from '@core/components/product/HorizontalBrandSkeleton';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === TYPE === */
interface HorizontalBrandLayoutProps {
  data: Array<models.BrandListItem>;
  loading: boolean;
  onEndReached?: () => void;
  onCardPress?: (item: models.BrandListItem, index: number) => void;
}
/** === COMPONENT === */
export const HorizontalBrandLayout: FC<HorizontalBrandLayoutProps> = ({
  data,
  loading,
  onEndReached,
  onCardPress,
}) => {
  /** === VIEW === */
  /** === Brand Card === */
  const renderBrandCard = ({
    item,
    index,
  }: {
    item: models.BrandListItem;
    index: number;
  }) => (
    <View
      key={index}
      style={{
        marginLeft: index === 0 ? 16 : 0,
        marginRight: index === data.length - 1 ? 16 : 0,
      }}>
      <BrandCard
        id={item.id}
        imageUrl={item.image}
        height={150}
        width={110}
        onCardPress={() => {
          if (onCardPress) {
            onCardPress(item, index);
          }
        }}
      />
    </View>
  );
  /** => Main */
  return loading ? (
    <HorizontalBrandSkeleton />
  ) : (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      renderItem={renderBrandCard}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      onEndReached={onEndReached}
    />
  );
};
