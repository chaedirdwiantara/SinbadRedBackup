import React from 'react';
import { toCurrency } from '@core/functions/global/currency-format';
import { View, StyleSheet } from 'react-native';
import { Description, Header } from './information';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { Divider } from '../order-history-detail/information';

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
    <>
      <View style={styles.main}>
        <Header title="Informasi Pembayaran" testID="textTitle.2.2" />
        <Description
          title="Metode Pembayaran"
          value={data?.paymentMethod || ''}
        />
        <Description
          title={`Total Harga (${data?.totalQty || 0} Barang)`}
          value={toCurrency(data?.totalOrderParcelsAfterTax || 0, {
            withFraction: false,
          })}
        />
        {data?.sinbadVoucherDiscountOrder ? (
          <Description
            title={'Potongan Voucher'}
            voucher={true}
            value={`-${toCurrency(data?.sinbadVoucherDiscountOrder || 0, {
              withFraction: false,
            })}`}
          />
        ) : null}
        <Description
          title="Total Belanja"
          value={toCurrency(data?.totalOrderPrice || 0, {
            withFraction: false,
          })}
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
    height: 80,
    marginBottom: 10,
  },
});

export default PaymentInformation;
