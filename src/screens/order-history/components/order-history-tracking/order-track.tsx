import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Header,
  Divider,
} from '../../components/order-history-detail/information';
import Stepper from './stepper';

// created packed shipped delivered done cancelled delivery_failed
const mockStatus = 'packed';
const status2id = {
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
  status: string;
};
const listTrack: Array<ListTrack> = [
  {
    id: 1,
    icon: 'packed',
    label: 'Dikemas',
    status: 'done',
  },
  {
    id: 2,
    icon: 'shiped',
    label: 'Dikirim',
    status: 'process',
  },
  {
    id: 3,
    icon: 'delivered',
    label: 'Tiba di Tujuan',
    status: 'waiting',
  },
  {
    id: 4,
    icon: 'done_order',
    label: 'Selesai',
    status: 'waiting',
  },
];

const OrderTrack = () => {
  const checkStatus = useCallback(
    (id: number) => {
      // status jika id sama atau lebih maka done
      if (status2id[mockStatus] >= id) {
        return 'done';
      }
      // jika di antara array itu, maka disable
      if (
        ['cancelled', 'delivery_failed', 'created'].some(
          (i) => i === mockStatus,
        )
      ) {
        return 'waiting';
      }
      // jika id berbeda kurang dari 1, maka set red opacity .5
      if (status2id[mockStatus] == id - 1) {
        return 'process';
      }
      return 'waiting';
    },
    [mockStatus],
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
});

export default OrderTrack;
