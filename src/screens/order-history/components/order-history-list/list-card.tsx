import React, { FC, memo, useCallback, useContext, useRef } from 'react';
import { toCurrency } from '@core/functions/global/currency-format';
import {
  SnbText,
  SnbBadge,
  color,
  SnbProductListSkeleton,
  SnbEmptyData,
  SnbImageCompressor,
  SnbButton,
} from '@sinbad/react-native-sinbad-ui';
import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import BottomSheetConfirmation, {
  BottomSheetTransactionRef,
} from '@core/components/BottomSheetConfirmation';
import ConfirmationTime from '../confirmation-time';
// function
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { Context } from './context';
import {
  useHistoryListFunction,
  goToWaitingPaymentHistoryDetail,
  useHistoryListPaymentFunction,
} from '../../functions/history-list';
import { CountDownTimer } from '@screen/history/components';
import { useDetailHistoryOrder } from '../../functions/history-detail';
import { NavigationAction } from '@core/functions/navigation';
// type
import * as models from '@models';
import { labelStatus } from '../../types';
import { usePaymentHistoryContext } from 'src/data/contexts/oms/payment-history/usePaymentHistoryContext';

type CardProps = {
  data: models.OrderListHistory;
  onCancelOrder?: () => void;
  onConFirmOrder?: () => void;
};

type CardWaitingForPaymentProps = {
  data: models.WaitingPaymentListHistory;
  onDetailOrder?: () => void;
};

const { width: W } = Dimensions.get('screen');

const Card: FC<CardProps> = (props) => {
  const { data, onCancelOrder, onConFirmOrder } = props;
  return (
    <Pressable
      style={styles.card}
      android_ripple={{ color: color.black40 }}
      onPress={() =>
        NavigationAction.navigate('OrderHistoryDetailView', {
          id: data.id,
        })
      }>
      <View style={{ margin: 16 }}>
        {/* title */}
        <View style={styles.title}>
          <SnbText.B2>{data.sellerName}</SnbText.B2>
          <SnbBadge.Label
            value={data.statusLabel}
            type={labelStatus[data.statusValue] || 'error'}
          />
        </View>
        {/* Timer */}
        {data.statusValue === 'delivered' ? (
          <ConfirmationTime doneAt={data?.doneAt || ''} />
        ) : (
          <View />
        )}
        {/* product */}
        <View>
          <View style={styles.product}>
            <SnbImageCompressor style={styles.image} uri={data.product.image} />
            <View style={styles.descProduct}>
              <SnbText.C1 color={color.black60}>{data.product.name}</SnbText.C1>
              <SnbText.C1
                color={
                  color.black60
                }>{`(${data.product.qty}) ${data.product.uom}`}</SnbText.C1>
              <SnbText.C1>
                {toCurrency(data.product.totalPrice, { withFraction: false })}
              </SnbText.C1>
            </View>
          </View>
          {data.totalOrderProducts > 0 && (
            <SnbText.C1 color={color.black60} align="center">
              + {data.totalOrderProducts} produk lainnya
            </SnbText.C1>
          )}
          <View style={styles.div} />
        </View>
        {/* inform */}
        <View>
          <View style={styles.information}>
            <SnbText.C1 color={color.black60}>Tanggal Pemesanan</SnbText.C1>
            <SnbText.C1 color={color.black60}>
              {moment(data.orderedAt).format('DD MMM YYYY')}
            </SnbText.C1>
          </View>
          <View style={styles.information}>
            <SnbText.C1>Total Pesanan</SnbText.C1>
            <SnbText.C1>
              {toCurrency(data.totalOrderPrice, { withFraction: false })}
            </SnbText.C1>
          </View>
        </View>
        {/* action */}
        <View style={styles.buttonContainer}>
          {/* if process */}
          {data.isCancellable ? (
            <TouchableOpacity style={styles.cancel} onPress={onCancelOrder}>
              <SnbText.C1 color={color.white}>Batalkan</SnbText.C1>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {/* if delivered */}
          {data.isOrderAbleToDone ? (
            <TouchableOpacity style={styles.delivered} onPress={onConFirmOrder}>
              <SnbText.C1 color={color.white}>Pesanan Diterima</SnbText.C1>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const CardWaitingForPayment: FC<CardWaitingForPaymentProps> = (props) => {
  const { data, onDetailOrder } = props;
  return (
    <View style={styles.card}>
      <View style={{ margin: 16 }}>
        {/* countdown timer*/}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: color.red10,
            marginBottom: 16,
            padding: 8,
            paddingLeft: 16,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <SnbText.C1 color={color.red50}>
            {'Batas waktu pembayaran: '}
          </SnbText.C1>
          <CountDownTimer
            type={'simple'}
            expiredTime={data!.paymentExpiredDate}
          />
        </View>
        {/* virtual account information*/}
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 6,
            paddingHorizontal: 16,
          }}>
          <Image
            source={{
              uri: data.paymentIconUrl,
            }}
            style={{
              width: 100,
              height: 50,
              marginRight: 16,
              resizeMode: 'contain',
              borderColor: color.black5,
            }}
          />
          <View>
            <SnbText.H3>{data.paymentDisplayLabel}</SnbText.H3>
            <SnbText.C2>{data.vaAccountNo}</SnbText.C2>
          </View>
        </View>
        {/* button action and total*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 6,
            paddingHorizontal: 16,
          }}>
          <View>
            <SnbText.C1>Total Pembayaran:</SnbText.C1>
            <SnbText.H4>
              {toCurrency(Number(data.totalOrderAmount) ?? 0, {
                withFraction: false,
              })}
            </SnbText.H4>
          </View>
          <SnbButton.Dynamic
            size="small"
            type="primary"
            title={'Detail pesanan'}
            onPress={onDetailOrder}
          />
        </View>
      </View>
    </View>
  );
};

const EmptyImage = () => (
  <Image
    source={require('../../../../assets/images/empty_sinbad.png')}
    resizeMode="contain"
    style={{ height: W * 0.7, aspectRatio: 1 }}
  />
);

const wordingEmpty = (keyword: string): string => {
  if (keyword) return 'Pesanan tidak ditemukan';
  return 'Belum ada pesanan';
};
const wordingWaitingForPaymentEmpty = () => {
  return 'Belum ada pesanan';
};

const ListCard = () => {
  const [state] = useContext(Context);
  const confirmModalRef = useRef<BottomSheetTransactionRef>(null);
  const { onLoadMorePayment, onRefreshPayment } =
    useHistoryListPaymentFunction();
  const { onLoadMore, onRefresh } = useHistoryListFunction();
  const { cancelOrder, doneOrder } = useDetailHistoryOrder();
  const {
    stateOrderHistory: {
      list: {
        loading: historyListLoading,
        data: historyListData,
        error: historyListError,
        loadMore: historyListLoadMore,
      },
    },
  } = useOrderHistoryContext();
  const {
    statePaymentHistory: {
      listWaitingPayment: {
        loading: historyListPaymentLoading,
        data: historyListPaymentData,
        error: historyListPaymentError,
        loadMore: historyListPaymentLoadMore,
      },
    },
  } = usePaymentHistoryContext();

  // loading view
  if ([historyListLoading].some((i) => i)) {
    return <SnbProductListSkeleton />;
  }
  // function
  const onCancelOrder = useCallback(
    (idOrder: string) => {
      const { keyword, orderStatus, status } = state;
      const payload = { keyword, orderStatus, status, id: idOrder };
      cancelOrder({ ...payload, type: 'list' });
    },
    [state.keyword, state.orderStatus, state.status],
  );
  const onDoneOrder = useCallback(
    (idOrder: string) => {
      const { keyword, orderStatus, status } = state;
      const payload = { keyword, orderStatus, status, id: idOrder };
      doneOrder({ ...payload, type: 'list' });
    },
    [state.keyword, state.orderStatus, state.status],
  );
  // error View
  if ([historyListError].some((i) => i)) {
    return (
      <SnbEmptyData
        image={<EmptyImage />}
        subtitle=""
        title={'Terjadi gangguan pada jaringan'}
      />
    );
  }

  // render list waiting paymment
  if (state.status === 'waiting_for_payment') {
    return (
      <>
        {[historyListPaymentLoading].some((i) => i) ? (
          <SnbProductListSkeleton />
        ) : [historyListPaymentError].some((i) => i) ? (
          <SnbEmptyData
            image={<EmptyImage />}
            subtitle=""
            title={'Terjadi gangguan pada jaringan'}
          />
        ) : (
          <FlatList
            contentContainerStyle={{ paddingBottom: 50 }}
            data={historyListPaymentData}
            keyExtractor={(i) => String(i.id)}
            renderItem={({ item }) => (
              <CardWaitingForPayment
                key={String(item.id)}
                data={item}
                onDetailOrder={() =>
                  goToWaitingPaymentHistoryDetail(
                    'orderHistory',
                    Number(item.id),
                  )
                }
              />
            )}
            onEndReached={onLoadMorePayment}
            ListEmptyComponent={() => (
              <View style={styles.waitingForPaymentEmpty}>
                <SnbEmptyData
                  image={<EmptyImage />}
                  subtitle=""
                  title={wordingWaitingForPaymentEmpty()}
                />
              </View>
            )}
            refreshControl={
              <RefreshControl
                onRefresh={() => onRefreshPayment()}
                refreshing={[
                  historyListPaymentLoading,
                  historyListPaymentLoadMore,
                ].some((i) => i)}
              />
            }
          />
        )}
      </>
    );
  }
  // render order history list
  return (
    <>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={historyListData}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            onCancelOrder={() => confirmModalRef.current?.show(item.id)}
            onConFirmOrder={() => onDoneOrder(item.id)}
          />
        )}
        onEndReached={onLoadMore}
        ListEmptyComponent={() =>
          !historyListLoading ? (
            <SnbEmptyData
              image={<EmptyImage />}
              subtitle=""
              title={wordingEmpty(state.keyword)}
            />
          ) : (
            <View />
          )
        }
        refreshControl={
          <RefreshControl
            onRefresh={() => onRefresh()}
            refreshing={[historyListLoading, historyListLoadMore].some(
              (i) => i,
            )}
          />
        }
      />
      {/* confirmation  batalkan*/}
      <BottomSheetConfirmation
        ref={confirmModalRef}
        title="Konfirmasi"
        desc="Yakin ingin membatalkan pesanan?"
        onSubmit={(idOrder) => onCancelOrder(idOrder)}
      />
    </>
  );
};

const styles = StyleSheet.create({
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
    width: '70%',
    justifyContent: 'center',
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
  detailOrder: {
    backgroundColor: color.red50,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  image: { height: 80, width: 80, borderRadius: 4, resizeMode: 'cover' },
  information: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonContainer: { flexDirection: 'row-reverse', marginTop: 8 },
  waitingForPaymentEmpty: { marginTop: 60, marginHorizontal: 60 },
  contentContainerStyle: { paddingBottom: 50, paddingTop: 30 },
});

export default memo(ListCard);