/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { styles, color } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
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
export const HorizontalGridCardSkeleton: FC = () => (
  <View style={{ width: 192, marginRight: 6 }}>
    <View
      style={{
        width: '100%',
        paddingBottom: 1,
        paddingHorizontal: 6,
      }}>
      <View
        style={[
          styles.shadowStyle,
          { borderRadius: 5, backgroundColor: color.white },
        ]}>
        <SkeletonAnimator>
          <View style={{ height: 120 }} />
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
