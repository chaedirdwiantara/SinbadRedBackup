/** === IMPORT PACKAGES === */
import React, { FC, useEffect, useReducer } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  color,
  styles,
  SnbToast,
} from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS === */
import LoadingPage from '@core/components/LoadingPage';
import {
  HistoryDetailCardDivider,
  HistoryDetailCard,
  HistoryDetailStatus,
  HistoryCardItem,
  HistoryDetailProductList,
} from '../../components';
import HistoryDetailPaymentInformation from './history-detail-payment-information.view';
import HistoryPaymentVirtualAccount from './history-payment-virtual-account.view';
/** === IMPORT FUNCTIONS === */
import { toCurrency } from '@core/functions/global/currency-format';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { useHistoryContext } from 'src/data/contexts/history/useHistoryContext';
import {
  goBack,
  usePaymentDetail,
  goToHistoryInvoice,
  usePaymentInvoice,
  useModalToast,
  useHistoryDetailAction,
  goToHistoryDetailStatus,
} from '../../functions';
/** === IMPORT STYLE === */
import { HistoryDetailStyle } from '../../styles';
/** === TYPES === */
type HistoryStackParamList = {
  Detail: { section: 'order' | 'payment'; id: string };
};
type HistoryDetailRouteProp = RouteProp<HistoryStackParamList, 'Detail'>;
/** === DUMMIES === */
const historyDetailDummy = {
  orderRefund: {
    orderPaidAmount: 3009400,
    deliveryFee: 0,
  },
};
/** === COMPONENT === */
const HistoryDetailView: FC = () => {
  /** === HOOKS & DERIVED VALUES === */
  const { params } = useRoute<HistoryDetailRouteProp>();
  const title = params.section === 'order' ? 'Pesanan' : 'Tagihan';
  const [seeMoreProducts, toggleSeeMoreProducts] = useReducer(
    (prevVisible) => !prevVisible,
    true,
  );
  const [seeMoreBonusProducts, toggleSeeMoreBonusProducts] = useReducer(
    (prevVisible) => !prevVisible,
    true,
  );
  const [seeMoreCanceledProducts, toggleSeeMoreCanceledProducts] = useReducer(
    (prevVisible) => !prevVisible,
    true,
  );
  const getPaymentDetail = usePaymentDetail();
  const getInvoiceDetail = usePaymentInvoice();
  const historyDetailAction = useHistoryDetailAction();
  const modalToast = useModalToast();
  const { stateHistory, dispatchHistory } = useHistoryContext();
  const { paymentInvoice, paymentDetail, detail, orderStatus, paymentStatus } =
    stateHistory;

  useEffect(() => {
    getPaymentDetail.detail(dispatchHistory, '1021639');
    historyDetailAction.fetch(dispatchHistory, params.id);
  }, []);

  useEffect(() => {
    if (paymentInvoice.data) {
      goToHistoryInvoice();
    }
  }, [paymentInvoice.data]);
  /** === FUNCTIONS === */
  /** => to fetch API invoice */
  const getInvoice = (id: string) => {
    getInvoiceDetail.detail(dispatchHistory, id);
  };
  /** => function to coppy VA Number */
  const onVACoppied = () => {
    modalToast.setOpen(true);
    modalToast.setToastText('Copied To Clipboard');
    setTimeout(() => {
      modalToast.setOpen(false);
    }, 3000);
  };
  /** === VIEW === */
  /** => Order/Payment Status */
  const renderStatus = () => {
    const historyOrderStatus = orderStatus.data.find(
      (statusItem) => statusItem.status === detail.data?.status,
    );
    const historyPaymentStatus = paymentStatus.data.find(
      (statusItem) => statusItem.status === detail.data?.statusPayment,
    );

    return (
      <HistoryDetailStatus
        status={
          params.section === 'order'
            ? historyOrderStatus?.title ?? ''
            : historyPaymentStatus?.title ?? ''
        }
        description={
          params.section === 'order'
            ? historyOrderStatus?.detail ?? ''
            : historyPaymentStatus?.detail ?? ''
        }
        onPress={() =>
          goToHistoryDetailStatus({
            orderCode: detail.data?.orderCode ?? '-',
            createdAt: detail.data?.createdAt ?? '-',
            trackingId: '-',
            cancelReason: detail.data?.orderCancelReason ?? '-',
            logs: detail.data?.orderParcelLogs ?? [],
          })
        }
      />
    );
  };
  /** => Invoice Info */
  const renderInvoiceInfo = () => (
    <HistoryDetailCard
      title="Informasi Faktur"
      actionTitle="Lihat Faktur"
      actionLoading={paymentInvoice.loading}
      onActionClick={() => getInvoice('1495865')}>
      <HistoryCardItem
        title="Nomor Pesanan"
        value={detail.data?.orderCode ?? '-'}
      />
      <HistoryCardItem
        title="Nomor Referensi"
        value={detail.data?.orderRef ?? '-'}
      />
    </HistoryDetailCard>
  );
  /** => Order Notes */
  const renderOrderNotes = () => (
    <HistoryDetailCard title="Catatan Pesanan">
      <HistoryCardItem title="Order Via" value={detail.data?.orderVia ?? '-'} />
      <HistoryCardItem
        title="Tanggal Pembelian"
        value={
          detail.data?.createdAt ? toLocalDateTime(detail.data?.createdAt) : '-'
        }
      />
      <HistoryCardItem
        title="Tanggal Pembatalan"
        value={
          detail.data?.cancelTime
            ? toLocalDateTime(detail.data?.cancelTime)
            : '-'
        }
      />
      <HistoryCardItem
        title="Tanggal Pengembalian"
        value={
          detail.data?.refundedTime
            ? toLocalDateTime(detail.data?.refundedTime)
            : '-'
        }
      />
    </HistoryDetailCard>
  );
  /** => render Virtual Account Info */
  const renderVirtualAccount = () => {
    return (
      <HistoryPaymentVirtualAccount
        onClick={() => onVACoppied()}
        data={paymentDetail.data}
      />
    );
  };
  /** => Payment Info */
  const renderPaymentInfo = () =>
    !paymentDetail?.loading ? (
      <HistoryDetailPaymentInformation dataPayment={paymentDetail.data} />
    ) : (
      <LoadingPage />
    );
  /** => Order Refund Info */
  const renderOrderRefundInfo = () => (
    <HistoryDetailCard title="Informasi Pengembalian">
      <HistoryCardItem
        title="Total Pembayaran Pesanan"
        value={
          historyDetailDummy.orderRefund.orderPaidAmount
            ? toCurrency(historyDetailDummy.orderRefund.orderPaidAmount)
            : toCurrency(0)
        }
      />
      <HistoryCardItem
        title="Total Pembayaran Pengiriman"
        value={
          historyDetailDummy.orderRefund.deliveryFee
            ? toCurrency(historyDetailDummy.orderRefund.deliveryFee)
            : toCurrency(0)
        }
      />
      <HistoryCardItem
        title="Total Pengembalian"
        value={toCurrency(
          historyDetailDummy.orderRefund.orderPaidAmount +
            historyDetailDummy.orderRefund.deliveryFee,
        )}
        type="bold"
      />
    </HistoryDetailCard>
  );
  /** => Delivery Detail */
  const renderDeliveryDetail = () => (
    <HistoryDetailCard title="Detail Pengiriman">
      <HistoryCardItem
        title="Kurir Pengiriman"
        value={detail.data?.deliveryCourier ?? '-'}
      />
      <HistoryCardItem
        title="Alamat Pengiriman"
        value={
          detail.data?.buyer?.storeAddress
            ? `${detail.data.buyer.storeAddress}${
                detail.data.buyer.urban ? ', ' + detail.data.buyer.urban : ''
              }`
            : '-'
        }
      />
    </HistoryDetailCard>
  );
  /** => Product List */
  const renderProductList = () => (
    <View>
      <View style={styles.shadowForBox10}>
        <HistoryDetailProductList
          title="Daftar Produk"
          products={detail.data?.orderParcelProducts ?? []}
          seeMore={seeMoreProducts}
          toggleSeeMore={toggleSeeMoreProducts}
        />
        {(detail.data?.orderParcelBonus.length ?? []) > 0 && (
          <>
            <HistoryDetailCardDivider horizontalSpaces={16} topSpaces={0} />
            <HistoryDetailProductList
              title="Bonus"
              products={detail.data?.orderParcelBonus ?? []}
              seeMore={seeMoreBonusProducts}
              toggleSeeMore={toggleSeeMoreBonusProducts}
            />
          </>
        )}
        {(detail.data?.orderParcelRemovedProducts.length ?? []) > 0 && (
          <>
            <HistoryDetailCardDivider horizontalSpaces={16} topSpaces={0} />
            <HistoryDetailProductList
              title="Produk Dibatalkan"
              products={detail.data?.orderParcelRemovedProducts ?? []}
              seeMore={seeMoreCanceledProducts}
              toggleSeeMore={toggleSeeMoreCanceledProducts}
            />
          </>
        )}
      </View>
      <View style={{ height: 10, backgroundColor: color.black5 }} />
    </View>
  );
  /** render Toast */
  const renderToast = () => {
    return (
      <SnbToast
        open={modalToast.isOpen}
        message={modalToast.toastText}
        close={() => modalToast.setOpen(false)}
        position={'top'}
      />
    );
  };
  /** => Detail Payment Content */
  const renderPaymentDetailContent = () => (
    <ScrollView>
      {renderStatus()}
      {renderInvoiceInfo()}
      {renderPaymentInfo()}
      {renderVirtualAccount()}
      {renderOrderRefundInfo()}
      {renderOrderNotes()}
      {renderProductList()}
      {renderDeliveryDetail()}
    </ScrollView>
  );
  /** => Detail Order Content */
  const renderOrderDetailContent = () => (
    <ScrollView>
      {renderStatus()}
      {renderInvoiceInfo()}
      {renderOrderNotes()}
      {renderProductList()}
      {renderPaymentInfo()}
      {renderOrderRefundInfo()}
      {renderDeliveryDetail()}
    </ScrollView>
  );
  /** => Content */
  const renderContent = () => (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <View style={HistoryDetailStyle.headerExtension} />
      {params.section === 'order'
        ? renderOrderDetailContent()
        : renderPaymentDetailContent()}
    </View>
  );
  /** => Footer */
  const renderFooter = () => (
    <View
      style={{
        ...HistoryDetailStyle.footer,
        paddingVertical: params.section === 'order' ? 16 : 24,
      }}>
      <TouchableWithoutFeedback
        onPress={() => console.log('Need help pressed')}>
        <View>
          <SnbText.B3 color={color.red50}>Butuh Bantuan?</SnbText.B3>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        type="red"
        title={`Detail ${title}`}
        backAction={goBack}
      />
      {renderContent()}
      {renderFooter()}
      {renderToast()}
    </SnbContainer>
  );
};

export default HistoryDetailView;
