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
              <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
                {`(${data.qty}) ${data.uom}`}
              </SnbText2.Paragraph.Small>
              <SnbText2.Body.Default>
                {toCurrency(data.productPriceAfterTax, { withFraction: false })}
              </SnbText2.Body.Default>
            </View>
          </View>
          <View style={{ marginVertical: 16 }}>
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
        {fristProduct ? <Card data={fristProduct} /> : <View />}
        {showMore ? (
          listProduct.map((i) => <Card key={i.id} data={i} />)
        ) : (
          <View />
        )}
        {data?.totalOrderProducts ? (
          <TouchableOpacity onPress={() => setShowMore((prev) => !prev)}>
            <SnbText2.Body.Tiny color={colorV2.textColor.link} align="center">
              {showMore ? 'Sembunyikan' : 'Lihat'}{' '}
              {showMore ? null : data.totalOrderProducts}{' '}
              {showMore ? 'produk' : 'produk lainnya'}
            </SnbText2.Body.Tiny>
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
    marginTop: 8,
    marginBottom: 20,
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
    marginVertical: 10,
  },
  descProduct: {
    marginLeft: 16,
    justifyContent: 'space-between',
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
