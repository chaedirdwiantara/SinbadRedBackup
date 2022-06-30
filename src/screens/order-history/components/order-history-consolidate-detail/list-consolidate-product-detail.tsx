import React, { FC, useMemo, useState } from 'react';
import {
  SnbText,
  SnbText2,
  color,
  colorV2,
  SnbImageCompressor,
  SnbDivider2,
  Text,
  SnbBadge2,
  SnbButton2,
} from '@sinbad/react-native-sinbad-ui';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Divider } from './information';
import { SkeletonAnimator } from '@core/components/SkeletonAnimator';
import { toCurrency } from '@core/functions/global/currency-format';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { Products } from '@model/order-history/detail-history.model';
import ConfirmationTime from '../confirmation-time';
import { NavigationAction } from '@core/functions/navigation';

type CardProps = {
  data: Products;
  id: string;
};

const Card: FC<CardProps> = (props) => {
  const { data, id } = props;
  const products = data.products[0];
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        NavigationAction.navigate('OrderHistoryDetailView', {
          id: id,
        });
      }}>
      <View style={{ margin: 16 }}>
        {/* product */}
        <View>
          <Text.Subtitle
            text={data.sellerName}
            actionComponent={
              <SnbBadge2 type="success" title={data.statusLabel} />
            }
          />
          {/* timer */}
          {data.statusValue === 'delivered' ? null : (
            <ConfirmationTime doneAt={data?.doneAt || ''} />
          )}
          <View style={styles.product}>
            <SnbImageCompressor style={styles.image} uri={products.image} />
            <View style={styles.descProduct}>
              <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                {products.name}
              </SnbText2.Paragraph.Default>
              <SnbText2.Body.Default>
                {`(${products.qty}) ${products.uom}`} x{' '}
                {toCurrency(products.totalPriceAfterTax, {
                  withFraction: false,
                })}
              </SnbText2.Body.Default>
            </View>
          </View>
          {/* more product */}
          {data.moreProducts > 0 ? (
            <View style={styles.moreProduct}>
              <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
                {`+ ${data?.moreProducts} produk lainnya`}
              </SnbText2.Paragraph.Small>
            </View>
          ) : null}
          {/* divider */}
          <View style={{ marginVertical: 8 }}>
            <SnbDivider2 type="solid" />
          </View>
        </View>
        {/* inform */}
        <View>
          <View style={styles.information}>
            <SnbText2.Body.Small>Total Pesanan</SnbText2.Body.Small>
            <SnbText2.Body.Small>
              {toCurrency(products.totalPriceAfterTax, {
                withFraction: false,
              })}
            </SnbText2.Body.Small>
          </View>
        </View>
        {/* action */}
        <View style={styles.buttonContainer}>
          {/* if process */}
          {data.isDisplayTrack && data.isDisplayDelivered ? (
            <>
              <View style={{ flex: 1 }}>
                <SnbButton2.Link
                  title="Lacak"
                  size="small"
                  onPress={() =>
                    NavigationAction.navigate('HistoryTrackingView', {
                      id: id,
                    })
                  }
                  full={true}
                />
              </View>
              <View style={{ flex: 1 }}>
                <SnbButton2.Secondary
                  title="Diterima"
                  size="small"
                  // onPress={onConFirmOrder}
                  onPress={() => {}}
                  outline={true}
                  full={true}
                />
              </View>
            </>
          ) : data.isDisplayTrack && data.isDisplayDelivered == false ? (
            <View style={{ flex: 1 }}>
              <SnbButton2.Secondary
                title="Lacak"
                size="small"
                onPress={() =>
                  NavigationAction.navigate('HistoryTrackingView', {
                    id: id,
                  })
                }
                outline={true}
                full={true}
              />
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ConsolidateListOrderDetail = () => {
  const [showMore, setShowMore] = useState(false);

  const {
    stateOrderHistory: {
      consolidateDetail: { loading, data },
    },
  } = useOrderHistoryContext();

  const [fristProduct, ...listProduct] = useMemo(
    () => data?.orderParcels || [],
    [data?.orderParcels],
  );
  if (loading) {
    return (
      <SkeletonAnimator>
        <View style={styles.skeleton} />
      </SkeletonAnimator>
    );
  }

  console.log(data?.orderParcels, 'DATA PRODUCT');

  return (
    <>
      <View style={styles.main}>
        <Header title="Daftar Pesanan" />
        {fristProduct ? (
          <Card data={fristProduct} id={fristProduct?.id} />
        ) : (
          <View />
        )}
        {showMore ? (
          listProduct.map((i) => <Card key={i.id} data={i} id={i?.id} />)
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
    marginTop: 8,
  },
  descProduct: {
    marginLeft: 16,
    justifyContent: 'flex-start',
    width: '70%',
  },
  image: { height: 80, width: 80, borderRadius: 4, resizeMode: 'cover' },
  information: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  skeleton: {
    flex: 1,
    height: 300,
    marginBottom: 10,
  },
  moreProduct: { alignItems: 'center', marginVertical: 8 },
});

export default ConsolidateListOrderDetail;
