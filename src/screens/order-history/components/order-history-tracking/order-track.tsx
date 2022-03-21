import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Header,
  Divider,
} from '../../components/order-history-detail/information';
import Stepper from './stepper';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';

const status2id: { [key: string]: number } = {
  created: 0,
  packed: 1,
  shipped: 2,
  delivered: 3,
  done: 4,
  cancelled: 2,
  delivery_failed: 2,
};
type ListTrack = {
  id: number;
  icon?: 'packed' | 'shiped' | 'delivered' | 'done_order';
  label: string;
};
const listTrack: Array<ListTrack> = [
  {
    id: 1,
    icon: 'packed',
    label: 'Dikemas',
  },
  {
    id: 2,
    icon: 'shiped',
    label: 'Dikirim',
  },
  {
    id: 3,
    icon: 'delivered',
    label: 'Tiba di Tujuan',
  },
  {
    id: 4,
    icon: 'done_order',
    label: 'Selesai',
  },
];

const OrderTrack = () => {
  const {
    stateOrderHistory: {
      tracking: { data, loading },
    },
  } = useOrderHistoryContext();

  const checkStatus = useCallback(
    (id: number) => {
      // status jika id sama atau lebih maka done
      if (status2id[data?.status || 'packed'] >= id) {
        return 'done';
      }
      // jika di antara array itu, maka disable
      if (
        ['cancelled', 'delivery_failed', 'created'].some(
          (i) => i === data?.status,
        )
      ) {
        return 'waiting';
      }
      // jika id berbeda kurang dari 1, maka set red opacity .5
      if (status2id[data?.status || 'packed'] == id - 1) {
        return 'process';
      }
      return 'waiting';
    },
    [data?.status],
  );
  if (loading)
    return (
      <SkeletonAnimator>
        <View style={styles.skeleton} />
      </SkeletonAnimator>
    );

  return (
    <>
      <View style={styles.main}>
        <Header title="Lacak Pesanan" />
        {listTrack.map((i, index) => (
          <Stepper
            key={i.id.toString()}
            icon={i.icon}
            label={i.label}
            status={checkStatus(i.id)}
            isEnd={listTrack.length === index + 1}
          />
        ))}
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
  skeleton: {
    flex: 1,
    height: 300,
    marginBottom: 10,
  },
});

export default OrderTrack;
