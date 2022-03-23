import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '../../components/order-history-detail/information';
import Stepper from './stepper';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';

const OrderHistory = () => {
  const {
    stateOrderHistory: {
      tracking: { data, loading },
    },
  } = useOrderHistoryContext();

  if (loading)
    return (
      <SkeletonAnimator>
        <View style={styles.skeleton} />
      </SkeletonAnimator>
    );

  return (
    <View style={styles.main}>
      <Header title="Riwayat Pesanan" />
      {data?.orderHistoryLogs.map((i) => (
        <Stepper
          key={i.id}
          label={i.logLabel}
          status="done"
          timeStamp={i.logCreatedAt}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
  skeleton: {
    flex: 1,
    height: 200,
  },
});

export default OrderHistory;
