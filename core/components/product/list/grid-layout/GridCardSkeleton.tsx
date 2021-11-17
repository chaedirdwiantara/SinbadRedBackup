/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { styles, color } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE === */
import { ProductSkeletonStyle } from '@core/styles';
/** === CONSTANT === */
const textSkeletonStyles = [
  {
    height: 14,
    borderRadius: 15,
    width: '90%',
  },
  {
    height: 12,
    borderRadius: 15,
    marginVertical: 8,
    width: '75%',
  },
  {
    height: 10,
    borderRadius: 15,
    marginVertical: 5,
    width: '60%',
  },
  {
    height: 10,
    borderRadius: 15,
    marginTop: 5,
    width: '70%',
  },
];
/** === COMPONENT === */
export const GridCardSkeleton: FC = () => (
  <View style={{ width: '50%' }}>
    <View style={ProductSkeletonStyle.gridCardContainer}>
      <View
        style={[
          styles.shadowStyle,
          { borderRadius: 5, backgroundColor: color.white },
        ]}>
        <SkeletonAnimator>
          <View style={{ height: 144 }} />
          <View style={{ padding: 12, paddingBottom: 0 }}>
            {textSkeletonStyles.map((style, index) => (
              <View key={index} style={style} />
            ))}
          </View>
          <View style={{ padding: 12 }}>
            <View style={{ height: 22, borderRadius: 15 }} />
          </View>
        </SkeletonAnimator>
      </View>
    </View>
  </View>
);
