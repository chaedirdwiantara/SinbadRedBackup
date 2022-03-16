import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../components/order-history-detail/information';
import Stepper from './stepper';

const orderHistoryLogsMock = [
  {
    id: '1',
    logLabel: 'Pesanan Diproses',
    logCreatedAt: '2022-03-13T07:00:00.000Z',
  },
  {
    id: '2',
    logLabel: 'Pesanan Dikemas',
    logCreatedAt: '2022-03-13T07:05:00.000Z',
  },
  {
    id: '3',
    logLabel: 'Pesanan Dikirim',
    logCreatedAt: '2022-03-13T07:20:00.000Z',
  },
  {
    id: '4',
    logLabel: 'Pesanan Tiba di Tujuan',
    logCreatedAt: '2022-03-13T13:00:00.000Z',
  },
  {
    id: '5',
    logLabel: 'Pesanan Selesai',
    logCreatedAt: '2022-03-13T14:00:00.000Z',
  },
];

const OrderHistory = () => {
  return (
    <View style={styles.main}>
      <Header title="Riwayat Pesanan" />
      {orderHistoryLogsMock.map((i) => (
        <Stepper label={i.logLabel} status="done" timeStamp={i.logCreatedAt} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
});

export default OrderHistory;
