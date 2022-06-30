import React from 'react';
import { toCurrency } from '@core/functions/global/currency-format';
import { View, StyleSheet } from 'react-native';
import { Description, Header } from './information';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';

const PaymentInformation = () => {
  const {
    stateOrderHistory: {
      consolidateDetail: { loading, data },
    },
  } = useOrderHistoryContext();

  if (loading) {
    return (
      <SkeletonAnimator>
        <View style={styles.skeleton} />
      </SkeletonAnimator>
    );
  }
  return (
    <View style={styles.main}>
      <Header title="Informasi Pembayaran" />
      <Description
        title="Metode Pembayaran"
        value={data?.paymentMethod || ''}
      />
      <Description
        title={`Total Harga (${
          (data?.totalOrderProducts || 0) + 1 || ''
        } Barang)`}
        value={toCurrency(data?.totalOrderParcelsAfterTax || 0, {
          withFraction: false,
        })}
      />
      <Description
        title="Total Belanja"
        value={toCurrency(data?.totalOrderPriceAfterTax || 0, {
          withFraction: false,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
  skeleton: {
    flex: 1,
    height: 80,
    marginBottom: 10,
  },
});

export default PaymentInformation;
