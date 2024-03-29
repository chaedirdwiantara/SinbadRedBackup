/** === IMPORT PACKAGES === */
import React, { FC, useEffect, useReducer } from 'react';
import {
  ScrollView,
  View,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  color,
  styles,
  SnbToast,
} from 'react-native-sinbad-ui';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
/** === IMPORT COMPONENTS === */
import BottomSheetError from '@core/components/BottomSheetError';
import LoadingPage from '@core/components/LoadingPage';
import {
  HistoryDetailCardDivider,
  HistoryDetailCard,
  HistoryDetailStatus,
  HistoryCardItem,
  HistoryDetailProductList,
  CountDownTimer,
  HistoryDetailSkeleton,
} from '../../components';
import HistoryDetailPaymentInformation from './history-detail-payment-information.view';
import HistoryPaymentVirtualAccount from './history-payment-virtual-account.view';
import HistoryPaymentInstruction from './history-payment-instruction.view';
import ModalBottomError from './history-error-modal-bottom.view';
import ModalCallCs from '@screen/help/components/ModalCallCs';
/** === IMPORT FUNCTIONS === */
import { toCurrency } from '@core/functions/global/currency-format';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { useHistoryContext } from 'src/data/contexts/history/useHistoryContext';
import {
  goBack,
  usePaymentDetail,
  goToHistoryInvoice,
  usePaymentInvoice,
  useHistoryDetailAction,
  goToHistoryDetailStatus,
  useModaBottomError,
  useActivateVa,
  useModalNeedHelp,
  useOrderStatusActions,
  usePaymentStatus,
} from '../../functions';
import {
  BillingStatus,
  PaymentType,
  ChannelType,
  OrderStatus,
} from '../../functions/data';
/** === IMPORT STYLE === */
import { HistoryDetailStyle } from '../../styles';
/** === TYPES === */
type HistoryStackParamList = {
  Detail: { section: 'order' | 'payment'; id: string; billingId: string };
};

type HistoryDetailRouteProp = RouteProp<HistoryStackParamList, 'Detail'>;
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
  const activateVA = useActivateVa();
  const modalError = useModaBottomError();
  const modalNeedHelp = useModalNeedHelp();
  const orderStatusActions = useOrderStatusActions();
  const getPaymentStatus = usePaymentStatus();
  const { stateHistory, dispatchHistory } = useHistoryContext();
  const {
    paymentInvoice,
    paymentDetail,
    detail,
    orderStatus,
    paymentStatus,
    activateVa,
  } = stateHistory;
  const pageLoading = paymentDetail.loading || detail.loading;
  const pageRefreshing = paymentDetail.refresh || detail.refresh;
  const refreshFetch = () => {
    getPaymentDetail.refresh(dispatchHistory, params.billingId);
    historyDetailAction.refresh(dispatchHistory, params.id, params.section);
  };
  /** => get Payment and Order Detail */
  useEffect(() => {
    if (orderStatus.data.length === 0 || paymentStatus.data.length === 0) {
      orderStatusActions.fetch(dispatchHistory);
      getPaymentStatus.list(dispatchHistory);
    }
    getPaymentDetail.detail(dispatchHistory, params.billingId);
    historyDetailAction.fetch(dispatchHistory, params.id, params.section);
  }, []);
  /** => on success get Invoice */
  useEffect(() => {
    if (paymentInvoice.data) {
      goToHistoryInvoice(paymentInvoice.data);
    }
  }, [paymentInvoice.data]);
  /** => on success activate VA*/
  useEffect(() => {
    if (activateVa.data) {
      getPaymentDetail.detail(dispatchHistory, params.billingId);
      historyDetailAction.fetch(dispatchHistory, params.id, params.section);
    }
  }, [activateVa.data]);
  /** => on Error get Invoice */
  useEffect(() => {
    if (paymentInvoice.error) {
      modalError.setOpen(true);
      modalError.setDataError(paymentInvoice.error);
    }
  }, [paymentInvoice.error]);
  /** => on error activate VA */
  useEffect(() => {
    if (activateVa.error) {
      modalError.setOpen(true);
      modalError.setDataError(activateVa.error);
    }
  }, [activateVa.error]);
  /** === FUNCTIONS === */
  /** => to fetch API invoice */
  const getInvoice = (id: string) => {
    getInvoiceDetail.detail(dispatchHistory, id);
  };
  /** => function to coppy VA Number */
  const onVACoppied = () => {
    const accountVa = paymentDetail.data?.accountVaNo || '';
    Clipboard.setString(accountVa.toString());
    SnbToast.show('Copied To Clipboard', 2000);
  };
  /** => function to goBack */
  const goBackAction = () => {
    goBack();
    activateVA.reset(dispatchHistory);
    getInvoiceDetail.reset(dispatchHistory);
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
      disabledAction={params.billingId ? false : true}
      onActionClick={() => getInvoice(params.billingId)}>
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
      {detail.data?.status !== 'cancel' &&
        detail.data?.statusPayment !== 'refunded' &&
        (detail.data?.deliveredDate !== null ? (
          <HistoryCardItem
            title="Tanggal Pengiriman"
            value={toLocalDateTime(detail.data?.deliveredDate!)}
          />
        ) : (
          <HistoryCardItem
            title="Estimasi Tanggal Pengiriman"
            value={toLocalDateTime(detail.data?.estDeliveredDate!)}
          />
        ))}
      {detail.data?.status !== 'cancel' &&
        detail.data?.status !== 'delivered' &&
        detail.data?.status !== 'done' &&
        detail.data?.statusPayment !== 'refunded' &&
        (detail.data?.dueDate !== null ? (
          <HistoryCardItem
            title="Jatuh Tempo"
            value={toLocalDateTime(detail.data?.dueDate!)}
          />
        ) : (
          <HistoryCardItem
            title="Estimasi Jatuh Tempo"
            value={toLocalDateTime(detail.data?.estDueDate!)}
          />
        ))}
      {detail.data?.status === 'cancel' &&
        detail.data?.statusPayment !== 'refunded' && (
          <HistoryCardItem
            title="Tanggal Pembatalan"
            value={
              detail.data?.cancelTime
                ? toLocalDateTime(detail.data?.cancelTime)
                : '-'
            }
          />
        )}
      {detail.data?.statusPayment === 'refunded' ||
        (detail.data?.statusPayment === 'waiting_for_refund' && (
          <HistoryCardItem
            title="Tanggal Pengembalian"
            value={
              detail.data?.refundedTime
                ? toLocalDateTime(detail.data?.refundedTime)
                : '-'
            }
          />
        ))}
    </HistoryDetailCard>
  );
  /** => render Virtual Account Info */
  const renderVirtualAccount = () => {
    const dataPayment = paymentDetail.data;
    const statusOrder = detail.data?.status;
    return dataPayment?.billingStatus !== BillingStatus.CANCEL &&
      dataPayment?.paymentChannel.id !== ChannelType.CASH ? (
      <HistoryPaymentVirtualAccount
        onClick={() => onVACoppied()}
        data={dataPayment}
        statusOrder={statusOrder!}
      />
    ) : (
      <View />
    );
  };
  /** => Payment Info */
  const renderPaymentInfo = () =>
    !paymentDetail?.loading && paymentDetail.data ? (
      <HistoryDetailPaymentInformation
        dataPayment={paymentDetail?.data}
        dataOrder={detail?.data}
      />
    ) : (
      <View style={{ height: '20%' }}>
        <LoadingPage />
      </View>
    );
  /** => Order Refund Info */
  const renderOrderRefundInfo = () => {
    const dataOrder = detail.data;
    const dataPayment = paymentDetail.data;
    return dataPayment?.paymentType.id === PaymentType.PAY_NOW &&
      (dataOrder?.deliveredParcelModified ||
        (dataOrder?.status === BillingStatus.CANCEL &&
          (dataPayment.billingStatus === BillingStatus.PAID ||
            dataPayment.billingStatus === BillingStatus.REFUND_REQUESTED ||
            dataPayment.billingStatus === BillingStatus.REFUNDED))) ? (
      <HistoryDetailCard title="Informasi Pengembalian">
        <HistoryCardItem
          title="Total Pembayaran Pesanan"
          value={
            dataPayment.totalPayment
              ? toCurrency(dataPayment.totalPayment, { withFraction: false })
              : toCurrency(0, { withFraction: false })
          }
        />
        <HistoryCardItem
          title="Total Pembayaran Pengiriman"
          value={
            dataPayment.deliveredTotalPayment
              ? toCurrency(dataPayment.deliveredTotalPayment, {
                  withFraction: false,
                })
              : toCurrency(0, { withFraction: false })
          }
        />
        <HistoryCardItem
          title="Total Pengembalian"
          value={
            dataPayment.refundTotal
              ? toCurrency(dataPayment.refundTotal, { withFraction: false })
              : toCurrency(0, { withFraction: false })
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
              type="bonus"
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
  /** => render Payment Instruction */
  const renderPaymentInstruction = () => {
    const billingStatus = paymentDetail.data?.billingStatus;
    const orderParcelStatus = detail.data?.status;
    return billingStatus !== BillingStatus.PAID &&
      billingStatus !== BillingStatus.EXPIRED &&
      billingStatus !== BillingStatus.CANCEL &&
      billingStatus !== BillingStatus.REFUNDED &&
      billingStatus !== BillingStatus.REFUND_REQUESTED &&
      orderParcelStatus !== OrderStatus.DONE ? (
      <HistoryPaymentInstruction />
    ) : (
      <View />
    );
  };
  /** => render countdown */
  const renderCountDown = () => {
    const expiredPaymentTime = paymentDetail.data?.expiredPaymentTime;
    const dataPayment = paymentDetail.data;
    const paymentType = dataPayment?.paymentType.id;
    const paymentChannel = dataPayment?.paymentChannel.id;
    const billingStatus = dataPayment?.billingStatus;

    return moment.utc(new Date()).local() <
      moment.utc(expiredPaymentTime).local() &&
      paymentType !== PaymentType.PAY_COD &&
      paymentChannel !== ChannelType.CASH &&
      expiredPaymentTime !== null &&
      dataPayment?.accountVaNo !== null &&
      billingStatus !== BillingStatus.PAID &&
      (billingStatus === BillingStatus.PENDING ||
        (billingStatus === BillingStatus.OVERDUE &&
          expiredPaymentTime !== null)) ? (
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
  /** => render Modal Bottom Error */
  const renderModalError = () => {
    return modalError.isOpen && modalError.dataError ? (
      <ModalBottomError
        isOpen={modalError.isOpen}
        close={() => modalError.setOpen(false)}
        data={modalError.dataError}
      />
    ) : (
      <View />
    );
  };
  /** === RENDER MODAL CALL CS === */
  const renderCallCsModal = () => {
    return modalNeedHelp.isOpen ? (
      <ModalCallCs
        open={modalNeedHelp.isOpen}
        close={() => modalNeedHelp.setOpen(false)}
        closeModal={() => modalNeedHelp.setOpen(false)}
      />
    ) : null;
  };
  /** => Detail Payment Content */
  const renderPaymentDetailContent = () => (
    <ScrollView
      scrollEnabled={!pageLoading}
      refreshControl={
        <RefreshControl refreshing={pageRefreshing!} onRefresh={refreshFetch} />
      }>
      {!pageLoading ? (
        <>
          {renderStatus()}
          {renderCountDown()}
          {renderInvoiceInfo()}
          {renderPaymentInfo()}
          {renderOrderRefundInfo()}
          {renderVirtualAccount()}
          {renderPaymentInstruction()}
          {renderOrderNotes()}
          {renderProductList()}
          {renderDeliveryDetail()}
          {renderModalError()}
        </>
      ) : (
        <HistoryDetailSkeleton />
      )}
    </ScrollView>
  );
  /** => Detail Order Content */
  const renderOrderDetailContent = () => (
    <ScrollView
      scrollEnabled={!pageLoading}
      refreshControl={
        <RefreshControl refreshing={pageRefreshing!} onRefresh={refreshFetch} />
      }>
      {!pageLoading ? (
        <>
          {renderStatus()}
          {renderInvoiceInfo()}
          {renderOrderNotes()}
          {renderProductList()}
          {renderPaymentInfo()}
          {renderOrderRefundInfo()}
          {renderDeliveryDetail()}
        </>
      ) : (
        <HistoryDetailSkeleton />
      )}
    </ScrollView>
  );
  /** => Content */
  const renderContent = () => (
    <View style={{ backgroundColor: color.white, flex: 1 }}>
      <View style={HistoryDetailStyle.headerExtension} />
      {params.section === 'order'
        ? renderOrderDetailContent()
        : renderPaymentDetailContent()}
      {renderCallCsModal()}
    </View>
  );
  /** => Footer */
  const renderFooter = () => (
    <View
      style={{
        ...HistoryDetailStyle.footer,
        paddingVertical: params.section === 'order' ? 16 : 24,
      }}>
      <TouchableWithoutFeedback onPress={() => modalNeedHelp.setOpen(true)}>
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
        backAction={() => goBackAction()}
      />
      {renderContent()}
      {renderFooter()}
      <BottomSheetError
        open={Boolean(detail.error || paymentDetail.error)}
        error={detail.error ?? paymentDetail.error}
        closeAction={refreshFetch}
        retryAction={refreshFetch}
      />
    </SnbContainer>
  );
};

export default HistoryDetailView;
