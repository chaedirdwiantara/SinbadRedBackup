import React from 'react';
import { color, SnbText } from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet } from 'react-native';

type HeaderProps = {
  title: string;
};

export const Header = (props: HeaderProps) => {
  const { title } = props;
  return (
    <>
      <SnbText.B2>{title}</SnbText.B2>
      <View style={styles.divHeader} />
    </>
  );
};

type DescProps = {
  title: string;
  value: string;
};

export const Description = (props: DescProps) => {
  const { value, title } = props;
  return (
    <View style={styles.desc}>
      <View style={styles.text}>
        <SnbText.B3 color={color.black60} align="left">
          {title}
        </SnbText.B3>
      </View>
      <View style={styles.text}>
        <SnbText.B3 color={color.black60} align="right">
          {value}
        </SnbText.B3>
      </View>
    </View>
  );
};

export const Divider = () => <View style={styles.div} />;

export const mockData = {
  id: '1',
  statusValue: 'created',
  statusLabel: 'Diproses',
  orderSellerCode: 'S01000342004314',
  orderedAt: '2022-03-10T03:16:19.401Z',
  orderOrigin: 'DC TANGERANG',
  orderDestionation: 'Jl. Nangka',
  estimationDeliveredAt: '2022-03-13T03:16:19.401Z',
  products: [
    {
      id: '623150a5a52e77965f1f4520',
      image: 'https://picsum.photos/200/300',
      name: 'SGM Ananda 1',
      qty: '4',
      uom: 'pcs',
      price: 50000,
      totalPrice: 200000,
    },
    {
      id: '623150a5a52e77965f1f4521',
      image: 'https://picsum.photos/200/300',
      name: 'SGM Ananda 2',
      qty: '10',
      uom: 'pcs',
      price: 70000,
      totalPrice: 700000,
    },
    {
      id: '623150a5a52e77965f1f4522',
      image: 'https://picsum.photos/200/300',
      name: 'SGM Ananda 3',
      qty: '2',
      uom: 'pcs',
      price: 100000,
      totalPrice: 200000,
    },
  ],
  totalOrderProducts: 3,
  paymentMethodName: 'BCA Virtual Account',
  totalProductsPrice: 100000,
  totalOrderPrice: 100000,
  isCancellable: false,
  isOrderAbleToDone: true,
};

const styles = StyleSheet.create({
  divHeader: {
    backgroundColor: color.black10,
    height: 1,
    marginVertical: 8,
  },
  text: { flex: 1 },
  desc: {
    flexDirection: 'row',
    marginTop: 8,
  },
  div: {
    height: 10,
    backgroundColor: color.black10,
  },
});
