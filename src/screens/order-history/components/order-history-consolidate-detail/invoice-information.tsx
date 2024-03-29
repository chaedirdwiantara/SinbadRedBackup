import React from 'react';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { View, StyleSheet } from 'react-native';
import { Description, Divider, DescriptionBadge } from './information';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';

const InvoiceInformation = () => {
  const {
    stateOrderHistory: {
      consolidateDetail: { loading, data },
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
        <DescriptionBadge
          title="Rangkuman Pesanan"
          value={data?.fulfilment || ''}
        />
        <Description
          title="Tanggal Pemesanan"
          value={toLocalDateTime(data?.orderedAt || '')}
        />
        <Description
          title="Jumlah Supplier"
          value={`${data?.totalSupplier}` || ''}
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

export default InvoiceInformation;
