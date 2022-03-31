import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SnbText, SnbBadge, color } from '@sinbad/react-native-sinbad-ui';
import { NavigationAction } from '@core/functions/navigation';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import ConfirmationTime from '../confirmation-time';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { Divider } from './information';
import { labelStatus } from '../../types';

const StatusOrder = () => {
  const {
    stateOrderHistory: {
      detail: { loading, data },
    },
  } = useOrderHistoryContext();
  if (loading)
    return (
      <SkeletonAnimator>
        <View style={styles.skeleton} />
      </SkeletonAnimator>
    );
  return (
    <>
      <View style={{ margin: 16 }}>
        <View style={styles.main}>
          <View>
            <SnbText.B2>Status Pesanan:</SnbText.B2>
            <View style={{ marginTop: 4 }}>
              <SnbBadge.Label
                type={labelStatus[data?.statusValue || ''] || 'error'}
                value={data?.statusLabel || ''}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                NavigationAction.navigate('HistoryTrackingView', {
                  id: data?.id,
                })
              }>
              <SnbText.B2 color={color.red70}>Lacak</SnbText.B2>
            </TouchableOpacity>
          </View>
        </View>
        {/* time ticking delivered */}
        {data?.statusValue === 'delivered' ? (
          <ConfirmationTime doneAt={data?.doneAt || ''} />
        ) : (
          <View />
        )}
        {/* reason canceled */}
        {data?.orderSellerFailedReason ? (
          <View style={styles.reason}>
            <SnbText.C1 color={color.red70}>
              {data?.orderSellerFailedReason}
            </SnbText.C1>
          </View>
        ) : (
          <View />
        )}
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  main: { flexDirection: 'row', justifyContent: 'space-between' },
  button: {
    borderColor: color.red70,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 7.5,
  },
  skeleton: {
    flex: 1,
    height: 80,
    marginBottom: 10,
  },
  reason: {
    marginTop: 12,
    backgroundColor: color.red10,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default StatusOrder;
