/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === COMPONENTS === */
const StatusTagSkeleton: FC<{ index: number }> = ({ index }) => (
  <SkeletonAnimator>
    <View
      style={{
        borderRadius: 50,
        height: 36,
        width: 120,
        marginRight: index < 7 ? 16 : 0,
      }}
    />
  </SkeletonAnimator>
);

export const HistoryStatusSkeleton: FC = () => (
  <View>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 8,
        paddingHorizontal: 16,
      }}>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <StatusTagSkeleton key={index} index={index} />
        ))}
    </ScrollView>
  </View>
);
