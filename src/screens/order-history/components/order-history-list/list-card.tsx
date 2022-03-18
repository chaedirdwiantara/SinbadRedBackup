import React, { FC, memo, useContext, useRef } from 'react';
import { toCurrency } from '@core/functions/global/currency-format';
import {
  SnbText,
  SnbBadge,
  color,
  SnbProductListSkeleton,
  SnbEmptyData,
  SnbImageCompressor,
} from '@sinbad/react-native-sinbad-ui';
import {
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import BottomSheetConfirmation, {
  BottomSheetTransactionRef,
} from '@core/components/BottomSheetConfirmation';
// function
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { Context } from './context';
import { useHistoryListFunction } from '../../functions/history-list';
import { NavigationAction } from '@core/functions/navigation';
// type
import * as models from '@models';
import { labelStatus } from '../../types';

type CardProps = {
  data: models.OrderListHistory;
  onCancelOrder?: () => void;
  onConFirmOrder?: () => void;
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
          {data.isCancellable && (
            <TouchableOpacity style={styles.cancel} onPress={onCancelOrder}>
              <SnbText.C1 color={color.white}>Batalkan</SnbText.C1>
            </TouchableOpacity>
          )}
          {/* if delivered */}
          {data.isOrderDone && (
            <TouchableOpacity style={styles.delivered} onPress={onConFirmOrder}>
              <SnbText.C1 color={color.white}>Pesanan Diterima</SnbText.C1>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Pressable>
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

const ListCard = () => {
  const [state] = useContext(Context);
  const confirmModalRef = useRef<BottomSheetTransactionRef>(null);
  const { onLoadMore } = useHistoryListFunction();
  const {
    stateOrderHistory: {
      list: {
        loading: historyListLoading,
        data: historyListData,
        error: historyListError,
      },
    },
  } = useOrderHistoryContext();

  // loading view
  if ([historyListLoading].some((i) => i)) {
    return <SnbProductListSkeleton />;
  }
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
    return <SnbText.B2>Waiting Payment</SnbText.B2>;
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
            onConFirmOrder={() => {}}
          />
        )}
        onEndReached={onLoadMore}
        ListEmptyComponent={() => (
          <SnbEmptyData
            image={<EmptyImage />}
            subtitle=""
            title={wordingEmpty(state.keyword)}
          />
        )}
      />
      {/* confirmation  batalkan*/}
      <BottomSheetConfirmation
        ref={confirmModalRef}
        title="Konfirmasi"
        desc="Yakin ingin membatalkan pesanan?"
        onSubmit={(id) => {}}
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
  image: { height: 80, width: 80, borderRadius: 4, resizeMode: 'cover' },
  information: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonContainer: { flexDirection: 'row-reverse', marginTop: 8 },
  contentContainerStyle: { paddingBottom: 50, paddingTop: 30 },
});

export default memo(ListCard);
