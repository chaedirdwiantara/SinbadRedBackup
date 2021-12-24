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
  SnbIcon,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT COMPONENTS === */
import LoadingPage from '@core/components/LoadingPage';
import {
  HistoryDetailCardDivider,
  HistoryDetailCard,
  HistoryDetailStatus,
  HistoryCardItem,
  HistoryDetailProductList,
  CountDownTimer,
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
import {
  CANCEL,
  CASH,
  OVERDUE,
  PAID,
  PAY_COD,
  PAY_LATER,
  PAY_NOW,
  PENDING,
  REFUNDED,
  REFUND_REQUESTED,
} from '@screen/history/constant/history.constant';

/** === TYPES === */
type HistoryStackParamList = {
  Detail: { section: 'order' | 'payment'; id: string; billingId: string };
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
    getPaymentDetail.detail(dispatchHistory, params.billingId);
    historyDetailAction.fetch(dispatchHistory, params.id);
  }, []);

  useEffect(() => {
    if (paymentInvoice.data) {
      goToHistoryInvoice(paymentInvoice.data);
    }
  }, [paymentInvoice.data]);
  /** === FUNCTIONS === */
  /** => to fetch API invoice */
  const getInvoice = (id: string) => {
    getInvoiceDetail.detail(dispatchHistory, id);
  };
  /** => function to coppy VA Number */
  const onVACoppied = () => {
    const accountVa = paymentDetail.data?.accountVaNo || '';
    Clipboard.setString(accountVa.toString());
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
      onActionClick={() => getInvoice('1406522')}>
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
    const dataPayment = paymentDetail.data;
    return dataPayment?.billingStatus !== CANCEL ? (
      <HistoryPaymentVirtualAccount
        onClick={() => onVACoppied()}
        data={dataPayment}
      />
    ) : (
      <View />
    );
  };
  /** => Payment Info */
  const renderPaymentInfo = () =>
    !paymentDetail?.loading && paymentDetail.data ? (
      <HistoryDetailPaymentInformation dataPayment={paymentDetail?.data} />
    ) : (
      <View style={{ height: '20%' }}>
        <LoadingPage />
      </View>
    );
  /** => Order Refund Info */
  const renderOrderRefundInfo = () => {
    const dataOrder = detail.data;
    const dataPayment = paymentDetail.data;
    return dataPayment?.paymentType.id === PAY_NOW &&
      (dataOrder?.deliveredParcelModified ||
        (dataOrder?.status === CANCEL &&
          (dataPayment.billingStatus === PAID ||
            dataPayment.billingStatus === REFUND_REQUESTED ||
            dataPayment.billingStatus === REFUNDED))) ? (
      <HistoryDetailCard title="Informasi Pengembalian">
        <HistoryCardItem
          title="Total Pembayaran Pesanan"
          value={
            historyDetailDummy.orderRefund.orderPaidAmount
              ? toCurrency(dataPayment.totalPayment)
              : toCurrency(0)
          }
        />
        <HistoryCardItem
          title="Total Pembayaran Pengiriman"
          value={
            historyDetailDummy.orderRefund.deliveryFee
              ? toCurrency(dataPayment.deliveredTotalPayment)
              : toCurrency(0)
          }
        />
        <HistoryCardItem
          title="Total Pengembalian"
          value={
            dataPayment.refundTotal
              ? toCurrency(dataPayment.refundTotal)
              : toCurrency(0)
          }
          type="bold"
        />
      </HistoryDetailCard>
    ) : (
      <View />
    );
  };
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
        position={'bottom'}
        leftItem={
          <SnbIcon name={'check_circle'} color={color.green50} size={20} />
        }
      />
    );
  };
  /** => render countdown */
  const renderCountDown = () => {
    const expiredPaymentTime = paymentDetail.data?.expiredPaymentTime;
    const dataPayment = paymentDetail.data;
    const paymentType = dataPayment?.paymentType.id;
    const paymentChannel = dataPayment?.paymentChannel.id;
    const billingStatus = dataPayment?.billingStatus;
    return paymentType === PAY_LATER &&
      paymentChannel !== CASH &&
      expiredPaymentTime !== null &&
      dataPayment?.accountVaNo !== null &&
      billingStatus !== PAID &&
      (billingStatus === PENDING ||
        (billingStatus === OVERDUE && expiredPaymentTime !== null)) ? (
      <View style={styles.shadowForBox10}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <SnbText.H4 align="center">
            SEGERA LAKUKAN PEMBAYARAN DALAM WAKTU
          </SnbText.H4>
          <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <CountDownTimer
              type={'big'}
              expiredTime={paymentDetail.data!.expiredPaymentTime}
            />
          </View>
          <SnbText.B3 color={color.black60} align="center">
            {`(Sebelum ${moment(expiredPaymentTime).format('LLLL')} WIB)`}
          </SnbText.B3>
        </View>
        <View style={{ height: 10, backgroundColor: color.black10 }} />
      </View>
    ) : (
      <View />
    );
  };
  /** => Detail Payment Content */
  const renderPaymentDetailContent = () => (
    <ScrollView>
      {renderStatus()}
      {renderCountDown()}
      {renderInvoiceInfo()}
      {renderPaymentInfo()}
      {renderOrderRefundInfo()}
      {renderVirtualAccount()}
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
