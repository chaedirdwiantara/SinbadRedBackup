/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
/** === IMPORT COMPONENT ===  */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE ===  */
import { ProductBundleStyle } from '../../styles';
/** === COMPONENT === */
export const ProductBundleMainInfoSkeleton: FC = () => (
  <SkeletonAnimator>
    <View style={ProductBundleStyle.mainInfoContainer}>
      <View style={ProductBundleStyle.mainInfoImage} />
      <View>
        <View
          style={{
            height: 18,
            width: '10%',
            borderRadius: 20,
          }}
        />
        <View
          style={{
            height: 18,
            width: '50%',
            borderRadius: 20,
            marginVertical: 8,
          }}
        />
        <View
          style={{
            height: 18,
            width: '35%',
            borderRadius: 20,
            marginBottom: 8,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ height: 18, width: '30%', borderRadius: 20 }} />
          <View style={{ height: 18, width: '40%', borderRadius: 20 }} />
        </View>
      </View>
    </View>
  </SkeletonAnimator>
);
