import React from 'react';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { View, StyleSheet } from 'react-native';
import { Description, Divider, HeaderWithLink } from './information';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { NavigationAction } from '@core/functions/navigation';

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

  const handleLinkOnPress = () => {
    NavigationAction.navigate('InvoiceView', {
      id: data?.id,
      orderCode: data?.orderCode,
      type: 'orderhistory-Invoice',
    });
  };
  return (
    <>
      <View style={styles.main}>
        <HeaderWithLink
          title="Informasi Invoice"
          linkTitle="Lihat Invoce"
          testID="textTitle.2.2"
          linkOnPress={handleLinkOnPress}
        />
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
