import React, { FC, useMemo, useState } from 'react';
import {
  SnbText,
  color,
  SnbImageCompressor,
} from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Divider } from './information';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { toCurrency } from '@core/functions/global/currency-format';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { Products } from '@model/order-history/detail-history.model';

type CardProps = {
  data: Products;
};

const Card: FC<CardProps> = (props) => {
  const { data } = props;
  return (
    <View style={styles.card}>
      <View style={{ margin: 16 }}>
        {/* product */}
        <View>
          <View style={styles.product}>
            <SnbImageCompressor style={styles.image} uri={data.image} />
            <View style={styles.descProduct}>
              <SnbText.C1 color={color.black60}>{data.name}</SnbText.C1>
              <SnbText.C1
                color={color.black60}>{`(${data.qty}) ${data.uom}`}</SnbText.C1>
              <SnbText.C1>
                {toCurrency(data.price, { withFraction: false })}
              </SnbText.C1>
            </View>
          </View>
          <View style={styles.div} />
        </View>
        {/* inform */}
        <View>
          <View style={styles.information}>
            <SnbText.C1>Total Harga</SnbText.C1>
            <SnbText.C1>
              {toCurrency(data.totalPrice, { withFraction: false })}
            </SnbText.C1>
          </View>
        </View>
      </View>
    </View>
  );
};

const ListProductOrder = () => {
  const [showMore, setShowMore] = useState(false);

  const {
    stateOrderHistory: {
      detail: { loading, data },
    },
  } = useOrderHistoryContext();

  const [fristProduct, ...listProduct] = useMemo(
    () => data?.products || [],
    [data?.products],
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
        <Header title="Daftar Produk" />
        {fristProduct ? <Card data={fristProduct} /> : <View />}
        {showMore ? (
          listProduct.map((i) => <Card key={i.id} data={i} />)
        ) : (
          <View />
        )}
        {data?.totalOrderProducts ? (
          <TouchableOpacity onPress={() => setShowMore((prev) => !prev)}>
            <SnbText.B3 color={color.blue60} align="center">
              {showMore ? 'Sembunyikan' : 'Lihat'} {data.totalOrderProducts}{' '}
              produk lainnya
            </SnbText.B3>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 6,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  descProduct: {
    marginLeft: 16,
    justifyContent: 'center',
    width: '70%',
  },
  div: {
    height: 1,
    backgroundColor: color.black40,
    marginVertical: 14,
  },
  cancel: {
    backgroundColor: '#677A8E',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  delivered: {
    backgroundColor: color.red50,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  image: { height: 80, width: 80, borderRadius: 4, resizeMode: 'cover' },
  information: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonContainer: { flexDirection: 'row-reverse', marginTop: 8 },
  skeleton: {
    flex: 1,
    height: 300,
    marginBottom: 10,
  },
});

export default ListProductOrder;
