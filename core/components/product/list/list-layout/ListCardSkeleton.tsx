/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { styles } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE === */
import { ProductSkeletonStyle } from '@core/styles';
/** === CONSTANT === */
const titleSkeletonStyle = { height: 12, borderRadius: 10 };
const textSkeletonStyle = { height: 10, borderRadius: 10 };
/** === COMPONENT === */
export const ListCardSkeleton: FC = () => (
  <View style={[ProductSkeletonStyle.listCardContainer, styles.shadowForBox10]}>
    <SkeletonAnimator>
      <View style={{ flexDirection: 'row' }}>
        <View style={ProductSkeletonStyle.listCardImage} />
        <View style={{ flex: 1 }}>
          <View style={{ width: '70%', ...titleSkeletonStyle }} />
          <View
            style={{
              width: '40%',
              marginVertical: 8,
              ...titleSkeletonStyle,
            }}
          />
          <View style={ProductSkeletonStyle.listCardButtonContainer}>
            <View style={{ width: '70%' }}>
              <View style={{ width: '80%', ...textSkeletonStyle }} />
              <View
                style={{
                  width: '40%',
                  marginTop: 8,
                  ...textSkeletonStyle,
                }}
              />
            </View>
            <View style={{ height: 22, width: 80, borderRadius: 15 }} />
          </View>
        </View>
      </View>
    </SkeletonAnimator>
  </View>
);
