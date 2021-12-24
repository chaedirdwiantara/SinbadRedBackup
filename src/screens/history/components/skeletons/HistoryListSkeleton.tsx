/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
/** === IMPORT COMPONENT === */
import { HistoryCardSkeleton } from './HistoryCardSkeleton';
/** === COMPONENT === */
export const HistoryListSkeleton: FC = () => (
  <View style={{ flex: 1 }}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 12,
        paddingHorizontal: 8,
      }}>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <HistoryCardSkeleton key={index} />
        ))}
    </ScrollView>
  </View>
);
