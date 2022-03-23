import React from 'react';
import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import { Description, Header, Divider, mockData } from './information';

const InformationDelivery = () => {
  return (
    <>
      <View style={styles.main}>
        <Header title="Informasi Pengiriman" />
        <Description
          title="Alamat Pengiriman"
          value={mockData.orderDestionation}
        />
        <Description title="Dikirim Dari" value={mockData.orderOrigin} />
        <Description
          title="Estimasi Pengiriman"
          value={moment(mockData.estimationDeliveredAt).format('DD MMM YYYY')}
        />
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
});

export default InformationDelivery;
