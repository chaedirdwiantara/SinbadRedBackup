import React from 'react';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { View, StyleSheet } from 'react-native';
import { Description, Header, Divider, mockData } from './information';

const InformationInfoice = () => {
  return (
    <>
      <View style={styles.main}>
        <Header title="Informasi Faktur" />
        <Description title="Nomor Pesanan" value={mockData.orderSellerCode} />
        <Description
          title="Tanggal Pemesanan"
          value={toLocalDateTime(mockData.orderedAt)}
        />
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
});

export default InformationInfoice;
