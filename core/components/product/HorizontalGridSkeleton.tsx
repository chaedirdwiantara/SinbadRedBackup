/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
/** === IMPORT COMPONENT === */
import { HorizontalGridCardSkeleton } from './HorizontalGridCardSkeleton';
/** === COMPONENT === */
export const HorizontalGridSkeleton: FC = () => (
  <View style={{ flex: 1 }}>
    <ScrollView
      horizontal={true}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <HorizontalGridCardSkeleton key={index} />
        ))}
    </ScrollView>
  </View>
);
