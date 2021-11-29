/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
/** === IMPORT COMPONENT === */
import { ListCardSkeleton } from './ListCardSkeleton';
/** === COMPONENT === */
export const ListSkeleton: FC = () => (
  <View style={{ flex: 1 }}>
    <ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16 }}>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <ListCardSkeleton key={index} />
        ))}
    </ScrollView>
  </View>
);
