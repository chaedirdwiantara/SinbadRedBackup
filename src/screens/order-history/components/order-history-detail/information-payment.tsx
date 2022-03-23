import React from 'react';
import { toCurrency } from '@core/functions/global/currency-format';
import { View, StyleSheet } from 'react-native';
import { Description, Header, mockData } from './information';

const InformationPayment = () => {
  return (
    <View style={styles.main}>
      <Header title="Informasi Pembayaran" />
      <Description
        title="Metode Pembayaran"
        value={mockData.paymentMethodName}
      />
      <Description
        title={`Total Harga (${mockData.totalOrderProducts} Barang)`}
        value={toCurrency(mockData.totalProductsPrice, { withFraction: false })}
      />
      <Description
        title="Total Belanja"
        value={toCurrency(mockData.totalOrderPrice, { withFraction: false })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
});

export default InformationPayment;
