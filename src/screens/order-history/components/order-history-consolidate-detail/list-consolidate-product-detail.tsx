import React, { FC, useCallback, useState } from 'react';
import {
  SnbText2,
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
import ConfirmationTime from '../confirmation-time';
import { NavigationAction } from '@core/functions/navigation';
import { OrderParcels } from '@model/order-history';
import { useDetailHistoryOrder } from '@screen/order-history/functions/history-detail';
import { ConfirmationDoneSheet } from '../order-history-list';
import { labelStatus } from '@screen/order-history/types';

type CardProps = {
  data: OrderParcels;
  dataId: String;
};

const Card: FC<CardProps> = (props) => {
  const { data, dataId } = props;
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const { doneOrder } = useDetailHistoryOrder();
  const onPressAction = useCallback(() => {
    const payload: {
      id: string;
      type: 'list' | 'detail' | 'detail_consolidate';
      orderId: string;
    } = {
      type: 'detail_consolidate',
      id: String(data?.id),
      orderId: String(dataId),
    };
    if (data?.isDisplayDelivered) {
      doneOrder(payload);
    }
  }, [data?.isDisplayDelivered, data?.id]);
  //render modal confirmation done order
  const renderModalConfirmationDoneOrder = () => {
    return (
      <ConfirmationDoneSheet
        open={confirmationOpen}
        title="Pesanan diterima?"
        desc="Pastikan Anda telah menerima barang yang sesuai dengan pesanan Anda"
        onConfirm={() => {
          onPressAction();
          setConfirmationOpen(false);
        }}
        contentHeight={175}
        onClose={() => setConfirmationOpen(false)}
      />
    );
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        NavigationAction.navigate('OrderHistoryDetailView', {
          id: data.id,
        });
      }}>
      <View style={{ margin: 16 }}>
        {/* product */}
        <View>
          <Text.Subtitle
            text={data.sellerName}
            actionComponent={
              <SnbBadge2
                type={labelStatus[data.statusValue || ''] || 'error'}
                title={data.statusLabel}
              />
            }
          />
          {/* timer */}
          {data.statusValue === 'delivered' ? (
            <ConfirmationTime doneAt={data.doneAt || ''} />
          ) : (
            <View />
          )}
          <View style={styles.product}>
            <SnbImageCompressor style={styles.image} uri={data.productImage} />
            <View style={styles.descProduct}>
              <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
                {data.productName}
              </SnbText2.Paragraph.Default>
              <SnbText2.Body.Default>
                {`(${data.productQty}) ${data.productUom}`} x{' '}
                {toCurrency(data.productTotalPriceAfterTax, {
                  withFraction: false,
                })}
              </SnbText2.Body.Default>
            </View>
          </View>
          {/* more product */}
          {data.moreProducts > 0 ? (
            <View style={styles.moreProduct}>
              <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
                {`+ ${data.moreProducts} produk lainnya`}
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
              {toCurrency(data.totalOrderParcelAfterTax, {
                withFraction: false,
              })}
            </SnbText2.Body.Small>
          </View>
        </View>
        {/* action */}
        <View style={styles.buttonContainer}>
          {data.isDisplayTrack ? (
            <View style={{ flex: 1 }}>
              <SnbButton2.Secondary
                title="Lacak"
                size="small"
                onPress={() =>
                  NavigationAction.navigate('HistoryTrackingView', {
                    id: data.id,
                  })
                }
                outline={true}
                full={true}
              />
            </View>
          ) : null}
          {data.isDisplayDelivered ? (
            <>
              <View style={{ flex: 1, padding: 8, alignItems: 'center' }}>
                <SnbButton2.Link
                  title="Lacak"
                  size="small"
                  onPress={() =>
                    NavigationAction.navigate('HistoryTrackingView', {
                      id: data.id,
                    })
                  }
                  full={true}
                />
              </View>
              <View style={{ flex: 1 }}>
                <SnbButton2.Secondary
                  title="Diterima"
                  size="small"
                  key={data.id}
                  onPress={() => setConfirmationOpen(true)}
                  outline={true}
                  full={true}
                />
              </View>
            </>
          ) : null}
        </View>
      </View>
      {renderModalConfirmationDoneOrder()}
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
        <Header title="Daftar Pesanan" />
        {showMore === false ? (
          data?.orderParcels
            .slice(0, 2)
            .map((i) => <Card key={i.id} data={i} dataId={data.orderId} />)
        ) : (
          <View />
        )}
        {showMore ? (
          data?.orderParcels.map((i) => (
            <Card key={i.id} data={i} dataId={data.orderId} />
          ))
        ) : (
          <View />
        )}
        {data?.orderParcels.length > 2 ? (
          <TouchableOpacity
            onPress={() => setShowMore((prev) => !prev)}
            style={{ marginTop: 16 }}>
            <SnbText2.Body.Small color={colorV2.textColor.link} align="center">
              {showMore ? 'Sembunyikan Supplier' : 'Lihat Supplier Lainnya'}
            </SnbText2.Body.Small>
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
    marginBottom: 8,
    elevation: 3,
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
