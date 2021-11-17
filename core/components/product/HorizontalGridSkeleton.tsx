/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, FlatList } from 'react-native';
/** === IMPORT COMPONENT === */
import { HorizontalGridCardSkeleton } from './HorizontalGridCardSkeleton';
/** === COMPONENT === */
export const HorizontalGridSkeleton: FC = () => {
  /** === VIEW === */
  /** => Skeleton Item */
  const renderSkeletonItem = (props: any) => (
    <HorizontalGridCardSkeleton key={props.index} />
  );
  /** => Main */
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal={true}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        data={Array(8).fill(0)}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        renderItem={renderSkeletonItem}
        ItemSeparatorComponent={() => <View style={{ width: 6 }} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};
