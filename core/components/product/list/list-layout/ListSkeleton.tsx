/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, FlatList } from 'react-native';
/** === IMPORT COMPONENT === */
import { ListCardSkeleton } from './ListCardSkeleton';
/** === COMPONENT === */
export const ListSkeleton: FC = () => {
  /** === VIEW === */
  /** => Skeleton Item */
  const renderSkeletonItem = (props: any) => (
    <ListCardSkeleton key={props.index} />
  );
  /** => Main */
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={Array(8).fill(0)}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderSkeletonItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};
