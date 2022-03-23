import React, { useMemo } from 'react';
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

  const titleDateShipment = useMemo(() => {
    const title: { [key: string]: string } = {
      created: 'Estimasi Tanggal Pengiriman',
      packed: 'Estimasi Tanggal Pengiriman',

      shipped: 'Tanggal Pengiriman',
      delivered: 'Tanggal Pengiriman',
      done: 'Tanggal Pengiriman',

      cancelled: 'Tanggal Pembatalan',
      delivery_failed: 'Tanggal Pembatalan',
    };
    return title[data?.statusValue || 'created'];
  }, [data?.statusValue]);

  const dateShipment = useMemo(() => {
    const date: { [key: string]: string | undefined } = {
      created: data?.estimationShippedAt,
      packed: data?.estimationShippedAt,

      shipped: data?.shippedAt,
      delivered: data?.shippedAt,
      done: data?.shippedAt,

      cancelled: data?.cancelledAt,
      delivery_failed: data?.cancelledAt,
    };
    return date[data?.statusValue || 'created'];
  }, [
    data?.statusValue,
    data?.estimationShippedAt,
    data?.shippedAt,
    data?.cancelledAt,
  ]);

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
          value={data?.orderDestination || ''}
        />
        <Description title="Dikirim Dari" value={data?.orderOrigin || ''} />
        <Description
          title={titleDateShipment}
          value={moment(dateShipment || '').format('DD MMM YYYY')}
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
