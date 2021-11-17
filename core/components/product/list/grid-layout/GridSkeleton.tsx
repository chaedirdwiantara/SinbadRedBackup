/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, FlatList } from 'react-native';
/** === IMPORT COMPONENT === */
import { GridCardSkeleton } from './GridCardSkeleton';
/** === COMPONENT === */
export const GridSkeleton: FC = () => {
  /** === VIEW === */
  /** => Skeleton Item */
  const renderSkeletonItem = (props: any) => (
    <GridCardSkeleton key={props.index} />
  );
  /** => Main */
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 12 }}
        data={Array(8).fill(0)}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={renderSkeletonItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};
