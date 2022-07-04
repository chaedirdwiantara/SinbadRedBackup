import React from 'react';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { View, StyleSheet } from 'react-native';
import { Description, Header, Divider } from './information';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';

const InformationInfoice = () => {
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
        <Header title="Informasi Invoice" />
        <Description title="Order ID" value={data?.orderCode || ''} />
        <Description
          title="Tanggal Pemesanan"
          value={toLocalDateTime(data?.orderedAt || '')}
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

export default InformationInfoice;
