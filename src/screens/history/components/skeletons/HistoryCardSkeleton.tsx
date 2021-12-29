/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { styles } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENT === */
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
/** === IMPORT STYLE === */
import { HistoryStyle } from '@screen/history/styles';
/** === COMPONENT === */
export const HistoryCardSkeleton: FC = () => (
  <View
    style={[
      HistoryStyle.cardContainer,
      styles.shadowForBox10,
      { marginTop: 0, paddingHorizontal: 16 },
    ]}>
    <View
      style={{
        width: '100%',
        paddingBottom: 1,
      }}>
      <SkeletonAnimator>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ width: '50%' }}>
            <View
              style={{
                height: 12,
                borderRadius: 15,
                width: '55%',
                marginBottom: 8,
              }}
            />
            <View
              style={{
                height: 12,
                borderRadius: 15,
                width: '70%',
              }}
            />
          </View>
          <View style={{ width: '50%', alignItems: 'flex-end' }}>
            <View
              style={{
                height: 14,
                borderRadius: 15,
                width: '60%',
                marginBottom: 8,
              }}
            />
            <View style={{ height: 14, borderRadius: 15, width: '70%' }} />
          </View>
        </View>
        <View
          style={{
            height: 80,
            borderRadius: 8,
            marginHorizontal: 8,
            marginVertical: 16,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ height: 10, borderRadius: 15, width: '30%' }} />
          <View style={{ height: 10, borderRadius: 15, width: '20%' }} />
        </View>
      </SkeletonAnimator>
    </View>
  </View>
);
