/** === IMPORT PACKAGES === */
import React, { FC, useEffect, useState, useReducer } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  color,
  styles,
  SnbButton,
  SnbDialog,
  SnbToast,
} from 'react-native-sinbad-ui';
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
/** === IMPORT TYPE === */
import { StatusLog } from '../../types';
/** === IMPORT STYLE === */
import { HistoryDetailStyle } from '../../styles';
import { CANCEL } from '@screen/history/constant/history.constant';

/** === TYPES === */
type HistoryStackParamList = {
  Detail: { section: 'order' | 'payment'; id: string };
};
type HistoryDetailRouteProp = RouteProp<HistoryStackParamList, 'Detail'>;
/** === DUMMIES === */
const historyDetailDummy = {
  status: {
    title: 'Menunggu Persetujuan',
    desc: 'Supplier mengajukan perubahan',
  },
  invoice: {
    orderId: 'SNB19050014818',
    referenceId: null,
  },
  orderNotes: {
    via: 'Toko',
    purchaseDate: new Date(2021, 8, 15, 16, 46).toISOString(),
    cancelDate: null,
    refundDate: new Date(2021, 8, 18, 12, 46).toISOString(),
  },
  products: [
    {
      name: 'LAKME CC CREAM ALMOND',
      images:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
      price: 78000,
      qty: 10,
      originalQty: 5,
      total: 780000,
      originalTotal: 390000,
      uom: 'pcs',
    },
    {
      name: 'LAKME BLUR PERFECT CREAMER',
      images:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
      price: 150000,
      qty: 20,
      total: 3000000,
      uom: 'pcs',
    },
    {
      name: 'LAKME ABSOLUTE LIQUID CONCEALER IVORY FAIR',
      images:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67145109.png',
      price: 100000,
      qty: 12,
      total: 1200000,
      uom: 'pcs',
    },
  ],
  canceledProducts: [
    {
      name: 'LAKME CLASSIC EYEBROW PENCIL BLACK',
      images:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67126183.png',
      price: 30000,
      qty: 5,
      total: 150000,
      uom: 'pcs',
    },
    {
      name: 'LAKME BIPHASED MAKEUP REMOVER',
      images:
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/21158106.png',
      price: 70000,
      qty: 3,
      total: 210000,
      uom: 'pcs',
    },
  ],
  orderRefund: {
    orderPaidAmount: 3009400,
    deliveryFee: 0,
  },
  deliveryDetail: {
    courier: 'Self Delivery',
    address:
      'Jl. Kemang III No.18, RT.12/RW.2, Bangka, Kec. Mampang Prpt., Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730',
  },
};
const orderLogsDummy: Array<StatusLog> = [
  { status: 'done', createdAt: '2021-12-20T06:52:52.375Z' },
  { status: 'delivered', createdAt: '2021-12-19T04:52:52.375Z' },
  { status: 'shipping', createdAt: '2021-12-19T02:52:52.375Z' },
  { status: 'packing', createdAt: '2021-12-19T00:52:52.375Z' },
  { status: 'confirmed', createdAt: '2021-12-18T12:52:52.375Z' },
  { status: 'waiting_for_payment', createdAt: '2021-12-18T06:52:52.375Z' },
];
/** === COMPONENT === */
const HistoryDetailView: FC = () => {
  /** === HOOKS & DERIVED VALUES === */
  const { params } = useRoute<HistoryDetailRouteProp>();
  const title = params.section === 'order' ? 'Pesanan' : 'Tagihan';
  const [seeMoreProducts, toggleSeeMoreProducts] = useReducer(
    (prevVisible) => !prevVisible,
    true,
  );
  const [seeMoreCanceledProducts, toggleSeeMoreCanceledProducts] = useReducer(
    (prevVisible) => !prevVisible,
    true,
  );
  const [isConfirmOrderDialogOpen, setIsConfirmOrderDialogOpen] =
    useState(false);
  const [confirmDialogType, setConfirmDialogType] = useState<
    'accept' | 'refuse'
  >('accept');
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
            createdAt: detail.data?.createdAt!,
            trackingId: '10292019201',
            cancelReason: null,
            logs: orderLogsDummy,
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
      <HistoryCardItem
        title="Order Via"
        value={historyDetailDummy.orderNotes.via}
      />
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
        value={historyDetailDummy.deliveryDetail.courier}
      />
      <HistoryCardItem
        title="Alamat Pengiriman"
        value={historyDetailDummy.deliveryDetail.address}
      />
    </HistoryDetailCard>
  );
  /** => Product List */
  const renderProductList = () => (
    <View>
      <View style={styles.shadowForBox10}>
        <HistoryDetailProductList
          title="Daftar Produk"
          products={historyDetailDummy.products}
          seeMore={seeMoreProducts}
          toggleSeeMore={toggleSeeMoreProducts}
        />
        <HistoryDetailCardDivider horizontalSpaces={16} topSpaces={0} />
        <HistoryDetailProductList
          title="Produk Dibatalkan"
          products={historyDetailDummy.canceledProducts}
          seeMore={seeMoreCanceledProducts}
          toggleSeeMore={toggleSeeMoreCanceledProducts}
        />
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
      {params.section === 'order' &&
        historyDetailDummy.status.title.includes('Menunggu') && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbButton.Dynamic
              title="Tolak"
              type="secondary"
              size="medium"
              onPress={() => {
                setConfirmDialogType('refuse');
                setIsConfirmOrderDialogOpen(true);
              }}
            />
            <View style={{ marginLeft: 12 }}>
              <SnbButton.Dynamic
                title="Terima"
                type="primary"
                size="medium"
                onPress={() => {
                  setConfirmDialogType('accept');
                  setIsConfirmOrderDialogOpen(true);
                }}
              />
            </View>
          </View>
        )}
    </View>
  );
  /** => Order Confirmation Dialog */
  const renderOrderConfirmationDialog = () => (
    <SnbDialog
      open={isConfirmOrderDialogOpen}
      title={confirmDialogType === 'accept' ? 'Terima' : 'Tolak'}
      content={
        confirmDialogType === 'accept'
          ? 'Apakah Anda ingin menerima perubahan jumlah barang?'
          : 'Apakah Anda ingin membatalkan order?'
      }
      ok={() => console.log('Confirm yes pressed')}
      cancel={() => setIsConfirmOrderDialogOpen(false)}
    />
  );
  /** => main */
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        type="red"
        title={`Detail ${title}`}
        backAction={goBack}
      />
      {renderContent()}
      {renderFooter()}
      {renderOrderConfirmationDialog()}
      {renderToast()}
    </SnbContainer>
  );
};

export default HistoryDetailView;
