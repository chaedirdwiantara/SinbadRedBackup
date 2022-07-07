import React, { FC, forwardRef, memo, ReactNode, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { toCurrency } from '@core/functions/global/currency-format';
import {
  SnbText,
  SnbText2,
  SnbBadge,
  color,
  colorV2,
  SnbProductListSkeleton,
  SnbEmptyData,
  SnbImageCompressor,
  SnbButton,
  SnbButton2,
  SnbDivider2,
  SnbBadge2,
  SnbBottomSheet2,
  SnbBottomSheet2Ref,
  SnbBottomSheetPart,
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
  useConsolidateHistoryListFunction,
  goToWaitingPaymentHistoryDetail,
  useHistoryListPaymentFunction,
} from '../../functions/history-list';
import { CountDownTimer } from '@screen/oms/components/thank-you-page-count-down-timer.component';
import { useDetailHistoryOrder } from '../../functions/history-detail';
import { NavigationAction } from '@navigation';
// type
import * as models from '@models';
import { labelStatus } from '../../types';
import { usePaymentHistoryContext } from 'src/data/contexts/oms/payment-history/usePaymentHistoryContext';
import SnbBottomAction from '@sinbad/react-native-sinbad-ui/lib/typescript/components/BottomAction/BottomAction';
import ConfirmationDoneSheet from './confirmation-done-sheet';

type CardProps = {
  data: models.OrderListHistory;
  onCancelOrder?: () => void;
  onConFirmOrder?: () => void;
};

type CardPropsConsolidate = {
  data: models.ConsolidateOrderListHistory;
  onConfirmOrder? : () => void;
}

const dataDummyList =  [
  {
      "orderId": "SNE-2121182635204",
      "orderedAt": "2022-04-12T01:30:34Z",
      "fulfilment": "2/3 Selesai",
      "totalOrderPrice": 20000000,
      "moreSuppliers": 2,
      "orderParcels": [
          {
              "id": "4640",
              "sellerName": "PT. Tigaraksa Satria Tbk",
              "statusValue": "delivered",
              "statusLabel": "Tiba di Tujuan",
              "doneAt": "2022-07-08T01:30:34Z",
              "moreProducts": 2,
              "productId": "4695",
              "productImage": "https://images.sinbad.co.id/odoo_img/product/115810.png",
              "productName": "SGM ANANDA 1 400 GR GA edit",
              "productQty": 1,
              "productUom": "Kardus",
              "productTotalPriceAfterTax": 110002
          },
          {
            "id": "4641",
            "sellerName": "PT. Tigaraksa Satria Tbk2",
            "statusValue": "created",
            "statusLabel": "Diproses",
            "doneAt": "2022-04-12T01:30:34Z",
            "moreProducts": 3,
            "productId": "4696",
            "productImage": "https://images.sinbad.co.id/odoo_img/product/115810.png",
            "productName": "SGM ANANDA 2 400 GR GA edit",
            "productQty": 3,
            "productUom": "Kardus",
            "productTotalPriceAfterTax": 110002
        }
      ]
  },
  {
    "orderId": "SNE-2121182635204",
    "orderedAt": "2022-04-12T01:30:34Z",
    "fulfilment": "2/3 Selesai",
    "totalOrderPrice": 20000000,
    "moreSuppliers": 2,
    "orderParcels": [
        {
            "id": "4642",
            "sellerName": "PT. Tigaraksa Satria3 Tbk",
            "statusValue": "delivered",
            "statusLabel": "Tiba di Tujuan",
            "doneAt": "2022-04-12T01:30:34Z",
            "moreProducts": 2,
            "productId": "4695",
            "productImage": "https://images.sinbad.co.id/odoo_img/product/115810.png",
            "productName": "SGM ANANDA 1 400 GR GA edit",
            "productQty": 1,
            "productUom": "Kardus",
            "productTotalPriceAfterTax": 110002
        },
        {
          "id": "4643",
          "sellerName": "PT. Tigaraksa Satria4 Tbk2",
          "statusValue": "created",
          "statusLabel": "Diproses",
          "doneAt": "2022-04-12T01:30:34Z",
          "moreProducts": 3,
          "productId": "4696",
          "productImage": "https://images.sinbad.co.id/odoo_img/product/115810.png",
          "productName": "SGM ANANDA 2 400 GR GA edit",
          "productQty": 3,
          "productUom": "Kardus",
          "productTotalPriceAfterTax": 110002
      }
    ]
}
]

type CardWaitingForPaymentProps = {
  data: models.WaitingPaymentListHistory;
  onDetailOrder?: () => void;
};

const { width: W } = Dimensions.get('screen');

const CardConsolidation: FC<CardPropsConsolidate> = (props) => {
  const { data, onConfirmOrder} = props;
  return (
    <Pressable
      style={styles.card}
      android_ripple={{color: color.black40}}
      onPress={() =>
                NavigationAction.navigate('OrderHistoryConsolidateDetailView', {
                  id: data.orderId,
                })
                // console.log(data.orderId)
      }>
      <View style={{ margin: 16 }}>
        {/* top section */}
        <View style={styles.titleConsolidate}>
          {/* order identity section*/}
          <View>
            <SnbText2.Body.Small testID={'03'}>{data.orderId}</SnbText2.Body.Small>
            <SnbText2.Paragraph.Tiny color={colorV2.textColor.secondary} testID={'03'}>
            {moment(data.orderedAt).format('DD MMM YYYY')}
            </SnbText2.Paragraph.Tiny>
          </View>
          {/* fulfillment status section */}
          <SnbBadge2 
            testID = {'03'}
            type= {'neutral'}
            title={data.fulfilment}
          />
        </View>
      </View>
      <SnbDivider2></SnbDivider2>
      {/* mid section */}
      <View style={{marginHorizontal : 16, marginTop: 16}}>
        {ParcelConsolidation(data.orderParcels)}
      </View>
      {/* bottom section */}
      <View style={{marginBottom : 8, marginHorizontal: 16}}>
        <View style={styles.information}>
          <SnbText2.Body.Small>Total Pesanan</SnbText2.Body.Small>
          <SnbText2.Body.Small>
            {toCurrency(data.totalOrderParcelsAfterTax, {
              withFraction: false,
            })}
          </SnbText2.Body.Small>
        </View>
      </View>
      <View style={{marginBottom : 16, marginHorizontal: 16}}>
        <TouchableOpacity onPress={() => 
        // console.log(data.orderId)
         NavigationAction.navigate('OrderHistoryConsolidateDetailView', {
                  id: data.orderId,
                })
              }
        >
          <View style={styles.toDetailFooter}>
              <SnbText2.Body.Small
                color={
                  colorV2.textColor.link
                }>{`Lihat ${data.totalSupplier} Supplier Lainnya`}</SnbText2.Body.Small>
          </View>
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}
const ParcelConsolidation = (dataParcels: any[]) => {
  const [state] = useContext(Context);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [confirmationOrderId, setConfirmationOrderId] = useState('');
  const { doneOrder } = useDetailHistoryOrder();
  const onDoneOrder = useCallback(
    (idOrder: string) => {
      const { keyword, orderGroupStatus, subOrderGroupStatus, status } = state;
      const payload = { keyword, orderGroupStatus, subOrderGroupStatus, status, id: idOrder };
      doneOrder({ ...payload, type: 'list' });
    },
    [state.keyword, state.orderGroupStatus, state.subOrderGroupStatus, state.status],
  );
  //render modal confirmation done order
  const renderModalConfirmationDoneOrder = () => {
    if(confirmationOrderId != '')
    return (
      <ConfirmationDoneSheet
        open={confirmationOpen}
        title="Pesanan diterima?"
        desc="Pastikan Anda telah menerima barang yang sesuai dengan pesanan Anda"
        // onConfirm={() => onDoneOrder(confirmationOrderId)}
        onConfirm={() => {
          onDoneOrder(confirmationOrderId);
          setConfirmationOpen(false);
          // console.log(confirmationOrderId);
        }}
        contentHeight={175}
        onClose={() => setConfirmationOpen(false)}
      />
    );
  };
  return dataParcels?.map((dataParcel) => (
  <>
  {/* title */}
  <View style={styles.title}>
    {/* <SnbText.B2>{data.sellerName}</SnbText.B2> */}
    <SnbText2.Body.Small>{dataParcel.sellerName}</SnbText2.Body.Small>
    <SnbBadge2
      testID = {'03'}
      title={dataParcel.statusLabel}
      type={labelStatus[dataParcel.statusValue] || 'error'}
    />
  </View>
  {/* Timer */}
  {dataParcel.statusValue === 'delivered' ? (
    <ConfirmationTime doneAt={dataParcel?.doneAt || ''} />
  ) : (
    <View />
  )}
  {/* product */}
  <View>
    <View style={styles.product}>
      <SnbImageCompressor style={styles.image} uri={dataParcel.productImage} />
      <View style={styles.descProduct}>
        <SnbText2.Paragraph.Default color={colorV2.textColor.secondary}>
          {dataParcel.productName}
        </SnbText2.Paragraph.Default>
        <SnbText2.Body.Default>
        {`(${dataParcel.productQty}) ${dataParcel.productUom} x `}{toCurrency(dataParcel.totalOrderParcelAfterTax, {
            withFraction: false,
          })}
        </SnbText2.Body.Default>
      </View>
    </View>

    {dataParcel.moreProducts > 0 && (
      <SnbText2.Paragraph.Small
        color={colorV2.textColor.secondary}
        align="center">
        + {dataParcel.moreProducts} produk lainnya
      </SnbText2.Paragraph.Small>
    )}
    {/* confirmation button */}
    <>
    <View style={{ marginVertical: 16 }}>
      <SnbDivider2 type="solid" />
    </View>
    <View>
    {/* if delivered */}
    {dataParcel.statusValue == 'delivered' ? (
      <View style={{ marginBottom: 8}}>
            <SnbButton2.Secondary
              key={dataParcel.id}
              outline={true}
              title="Pesanan Diterima"
              size="small"
              onPress={() => {
                setConfirmationOrderId(dataParcel.id);
                setConfirmationOpen(true)
              }}
              full={true}
            />
      </View>      
          ) : (
            <View />
          )}
    </View>
    </>
    {/* confirmation  done*/}
    {renderModalConfirmationDoneOrder()}
  </View>

</>
))}

const CardWaitingForPayment: FC<CardWaitingForPaymentProps> = (props) => {
  const { data, onDetailOrder } = props;
  return (
    <View style={styles.card}>
      <View style={{ margin: 16 }}>
        {/* countdown timer*/}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colorV2.bgColor.red,
            marginBottom: 16,
            padding: 8,
            paddingLeft: 16,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <SnbText2.Paragraph.Small color={colorV2.textColor.selected}>
            {'Batas waktu pembayaran: '}
          </SnbText2.Paragraph.Small>
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
            paddingHorizontal: 0,
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
              borderColor: colorV2.strokeColor.default,
            }}
          />
          <View>
            <SnbText2.Body.Default color={colorV2.textColor.default}>
              {data.paymentDisplayLabel}
            </SnbText2.Body.Default>
            <SnbText2.Paragraph.Small color={colorV2.neutral.cloud50}>
              {data.vaAccountNo}
            </SnbText2.Paragraph.Small>
          </View>
        </View>
        {/* button action and total*/}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 6,
            paddingHorizontal: 0,
          }}>
          <View>
            <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
              Total Pembayaran:
            </SnbText2.Paragraph.Small>
            <SnbText2.Body.Small color={colorV2.textColor.default}>
              {toCurrency(Number(data.totalOrderPriceAfterTax) ?? 0, {
                withFraction: false,
              })}
            </SnbText2.Body.Small>
          </View>
          <SnbButton2.Primary
            size="small"
            full
            title={'Detail pesanan'}
            onPress={(onDetailOrder)}
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
    style={{ height: W * 0.6, aspectRatio: 1, marginTop: 100 }}
  />
);

const wordingEmpty = (keyword: string): string => {
  if (keyword) {
    return 'Pencarian Pesanan Tidak Ditemukan';
  }
  return 'Belum Ada Pesanan';
};
const wordingWaitingForPaymentEmpty = () => {
  return 'Belum Ada Pesanan';
};

const ListCard = () => {
  const [state] = useContext(Context);
  // const [confirmationOpen, setConfirmationOpen] = useState(false);
  // const [confirmationOrderId, setConfirmationOrderId] = useState('');
  // const { doneOrder } = useDetailHistoryOrder();
  const { onLoadMorePayment, onRefreshPayment } =
    useHistoryListPaymentFunction();
  const { onLoadMore, onRefresh } = useConsolidateHistoryListFunction();
  const {
    stateOrderHistory: {
      consolidateList: {
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
  // function
  // const onDoneOrder = useCallback(
  //   (idOrder: string) => {
  //     const { keyword, orderStatus, status } = state;
  //     const payload = { keyword, orderStatus, status, id: idOrder };
  //     doneOrder({ ...payload, type: 'list' });
  //   },
  //   [state.keyword, state.orderStatus, state.status],
  // );
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
        title={'Terjadi Gangguan Pada Jaringan'}
      />
    );
  }

  // render list waiting paymment
  if (state.orderGroupStatus === 'waiting_for_payment') {
    return (
      <>
        {[historyListPaymentLoading].some((i) => i) ? (
          <SnbProductListSkeleton />
        ) : [historyListPaymentError].some((i) => i) ? (
          <SnbEmptyData
            image={<EmptyImage />}
            subtitle=""
            title={'Terjadi Gangguan Pada Jaringan'}
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
  // //render modal confirmation done order
  // const renderModalConfirmationDoneOrder = () => {
  //   if(confirmationOrderId != '')
  //   return (
  //     <ConfirmationDoneSheet
  //       open={confirmationOpen}
  //       title="Pesanan diterima?"
  //       desc="Pastikan Anda telah menerima barang yang sesuai dengan pesanan Anda"
  //       onConfirm={() => onDoneOrder(confirmationOrderId)}
  //       contentHeight={175}
  //       onClose={() => setConfirmationOpen(false)}
  //     />
  //   );
  // };
  // render order history list
  return (
    <>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
            data={dataDummyList}
            keyExtractor={(i) => i.orderId}
            renderItem={({ item }) => (
              <CardConsolidation
                data={item}
                // onConfirmOrder= {()=>  console.log('irpan')}
                onConfirmOrder = {() => {
                  // setConfirmationOrderId(item.orderId);
                  // setConfirmationOpen(true)
                }}
              />
            )}
            onEndReached={onLoadMore}
            ListEmptyComponent={() =>
              dataDummyList.length == 0 ? (
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
      {/* confirmation  done
      {renderModalConfirmationDoneOrder()} */}
      </>
    
  );

};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 6,
    backgroundColor: colorV2.bgColor.light,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleConsolidate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colorV2.strokeColor.default
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
  toDetailFooter: {
    alignItems: 'center', 
    marginVertical: 6
  },
  image: { height: 80, width: 80, borderRadius: 4, resizeMode: 'cover' },
  information: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonContainer: { marginTop: 8 },
  waitingForPaymentEmpty: { marginTop: 60, marginHorizontal: 60 },
  contentContainerStyle: { paddingBottom: 50, paddingTop: 30 },
});

export default memo(ListCard);
