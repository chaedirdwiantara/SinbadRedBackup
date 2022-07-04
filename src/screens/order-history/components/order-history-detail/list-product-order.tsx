import React, { FC, useMemo, useState } from 'react';
import {
  SnbText,
  SnbText2,
  color,
  colorV2,
  SnbImageCompressor,
  SnbDivider2,
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
              <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                {data.name}
              </SnbText2.Paragraph.Default>
              <SnbText2.Body.Default>
                {`(${data.qty}) ${data.uom}`} x{' '}
                {toCurrency(data.productPriceAfterTax, { withFraction: false })}
              </SnbText2.Body.Default>
            </View>
          </View>
          <View style={{ marginVertical: 8 }}>
            <SnbDivider2 type="solid" />
          </View>
        </View>
        {/* inform */}
        <View>
          <View style={styles.information}>
            <SnbText2.Body.Small>Total Harga</SnbText2.Body.Small>
            <SnbText2.Body.Small>
              {toCurrency(data.totalProductPriceAfterTax, {
                withFraction: false,
              })}
            </SnbText2.Body.Small>
          </View>
        </View>
      </View>
    </View>
  );
};

const ListProductOrder = () => {
  const {
    stateOrderHistory: {
      detail: { loading, data },
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
        <Header title="Daftar Produk" />
        {data?.products.map((i) => (
          <Card key={i.id} data={i} />
        ))}
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  main: { margin: 16 },
  card: {
    marginTop: 8,
    marginBottom: 8,
    elevation: 6,
    backgroundColor: colorV2.bgColor.light,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  descProduct: {
    marginLeft: 16,
    justifyContent: 'flex-start',
    width: '70%',
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
