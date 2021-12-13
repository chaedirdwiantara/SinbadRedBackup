/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
import { styles, color } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === TYPE === */
interface BrandCardSkeletonProps {
  width?: number | string;
  height?: number;
  bottomSpaces?: number;
}
/** === COMPONENTS === */
export const BrandCardSkeleton: FC<BrandCardSkeletonProps> = ({
  width = 120,
  height = 150,
  bottomSpaces = 1,
}) => (
  <View style={{ minWidth: width, flex: 1, marginRight: 4 }}>
    <View
      style={{
        width: '100%',
        paddingBottom: bottomSpaces,
        paddingHorizontal: 6,
      }}>
      <View
        style={[
          styles.shadowStyle,
          { borderRadius: 8, backgroundColor: color.white },
        ]}>
        <SkeletonAnimator>
          <View style={{ height }} />
        </SkeletonAnimator>
      </View>
    </View>
  </View>
);

export const HorizontalBrandSkeleton: FC = () => (
  <View style={{ flex: 1 }}>
    <ScrollView
      horizontal={true}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}>
      {Array(8)
        .fill(0)
        .map((_, index) => (
          <BrandCardSkeleton key={index} />
        ))}
    </ScrollView>
  </View>
);
