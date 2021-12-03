/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
/** === IMPORT COMPONENT === */
import { GridCardSkeleton } from './GridCardSkeleton';
/** === COMPONENT === */
export const GridSkeleton: FC = () => (
  <View style={{ flex: 1 }}>
    <ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 16,
        paddingHorizontal: 12,
      }}>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <GridCardSkeleton key={index} />
        ))}
    </ScrollView>
  </View>
);
