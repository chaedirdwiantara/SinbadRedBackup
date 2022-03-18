import React from 'react';
import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import { Description, Header, Divider } from './information';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';

const InformationDelivery = () => {
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
      <View style={styles.main}>
        <Header title="Informasi Pengiriman" />
        <Description
          title="Alamat Pengiriman"
          value={data?.orderDestionation || ''}
        />
        <Description title="Dikirim Dari" value={data?.orderOrigin || ''} />
        <Description
          title="Estimasi Pengiriman"
          value={moment(data?.estimationDeliveredAt || '').format(
            'DD MMM YYYY',
          )}
        />
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
  skeleton: {
    flex: 1,
    height: 120,
    marginBottom: 10,
  },
});

export default InformationDelivery;
