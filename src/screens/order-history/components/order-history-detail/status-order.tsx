import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  SnbBadge2,
  colorV2,
  SnbButton2,
  SnbText2,
} from '@sinbad/react-native-sinbad-ui';
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
            <SnbText2.Body.Default>Status Pesanan:</SnbText2.Body.Default>
            <View style={{ marginTop: 4 }}>
              <SnbBadge2
                type={labelStatus[data?.statusValue || ''] || 'error'}
                title={data?.statusLabel || ''}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <SnbButton2.Primary
              title="Lihat Detail"
              size="tiny"
              outline
              onPress={() =>
                NavigationAction.navigate('HistoryTrackingView', {
                  id: data?.id,
                })
              }
            />
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
            <SnbText2.Paragraph.Tiny color={colorV2.textColor.error}>
              {data?.orderSellerFailedReason}
            </SnbText2.Paragraph.Tiny>
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
  skeleton: {
    flex: 1,
    height: 80,
    marginBottom: 10,
  },
  reason: {
    marginTop: 8,
    backgroundColor: colorV2.bgColor.red,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default StatusOrder;
