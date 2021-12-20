/** === IMPORT PACKAGES === */
import React, { FC, useEffect, useState, useMemo } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  color,
  styles,
  SnbIcon,
  SnbButton,
  SnbDialog,
  SnbToast,
} from 'react-native-sinbad-ui';
import Clipboard from '@react-native-clipboard/clipboard';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT COMPONENTS === */
import LoadingPage from '@core/components/LoadingPage';
import { ProductCard } from '@core/components/ProductCard';
import {
  HistoryDetailCardDivider,
  HistoryDetailCard,
  HistoryDetailStatus,
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
} from '../../functions';
/** === IMPORT STYLE === */
import { HistoryDetailStyle } from '../../styles';
import {
  CANCEL,
  PAID,
  PAY_NOW,
  REFUNDED,
  REFUND_REQUESTED,
  WAITING_FOR_REFUND,
} from '@screen/history/constant/history.constant';

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
/** === COMPONENT === */
const HistoryDetailView: FC = () => {
  /** === HOOKS & DERIVED VALUES === */
  const { params } = useRoute<HistoryDetailRouteProp>();
  const title = params.section === 'order' ? 'Pesanan' : 'Tagihan';
  const [seeMoreProducts, setSeeMoreProducts] = useState(true);
  const [seeMoreCanceledProducts, setSeeMoreCanceledProducts] = useState(true);
  const [isConfirmOrderDialogOpen, setIsConfirmOrderDialogOpen] =
    useState(false);
  const [confirmDialogType, setConfirmDialogType] = useState<
    'accept' | 'refuse'
  >('accept');
  const products = seeMoreProducts
    ? historyDetailDummy.products.slice(0, 2)
    : historyDetailDummy.products;
  const canceledProducts = seeMoreCanceledProducts
    ? historyDetailDummy.canceledProducts.slice(0, 2)
    : historyDetailDummy.canceledProducts;
  const getPaymentDetail = usePaymentDetail();
  const getInvoiceDetail = usePaymentInvoice();
  const historyDetailAction = useHistoryDetailAction();
  const modalToast = useModalToast();
  const { stateHistory, dispatchHistory } = useHistoryContext();
  const { paymentInvoice, paymentDetail, detail, orderStatus, paymentStatus } =
    stateHistory;
  const historyOrderStatus = useMemo(
    () =>
      orderStatus.data.filter(
        (statusItem) => statusItem.status === detail.data?.status,
      )[0],
    [],
  );
  const historyPaymentStatus = useMemo(
    () =>
      paymentStatus.data.filter(
        (statusItem) => statusItem.status === detail.data?.statusPayment,
      )[0],
    [],
  );

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
  const renderStatus = () => (
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
      onPress={() => console.log('Go to status detail pressed')}
    />
  );
  /** => Card Item */
  const renderCardItem = (
    key: string,
    value: string | null,
    type: 'normal' | 'bold' | 'green' = 'normal',
  ) => {
    const notBoldColor = type === 'normal' ? color.black60 : color.green50;

    return (
      <View key={`${key}-${value}`} style={HistoryDetailStyle.cardItem}>
        {type !== 'bold' ? (
          <>
            <View style={{ marginRight: 16 }}>
              <SnbText.B3 color={notBoldColor}>{key}</SnbText.B3>
            </View>
            <View style={{ maxWidth: '60%' }}>
              <SnbText.B3 color={notBoldColor} align="right">
                {value}
              </SnbText.B3>
            </View>
          </>
        ) : (
          <>
            <View style={{ marginRight: 16 }}>
              <SnbText.B4 color={color.black100}>{key}</SnbText.B4>
            </View>
            <View style={{ maxWidth: '60%' }}>
              <SnbText.B4 color={color.black100} align="right">
                {value}
              </SnbText.B4>
            </View>
          </>
        )}
      </View>
    );
  };
  /** => Invoice Info */
  const renderInvoiceInfo = () => (
    <HistoryDetailCard
      title="Informasi Faktur"
      actionTitle="Lihat Faktur"
      actionLoading={paymentInvoice.loading}
      onActionClick={() => getInvoice('1495865')}>
      {renderCardItem('Nomor Pesanan', detail.data?.orderCode ?? '')}
      {renderCardItem('Nomor Referensi', detail.data?.orderRef ?? '')}
    </HistoryDetailCard>
  );
  /** => Order Notes */
  const renderOrderNotes = () => (
    <HistoryDetailCard title="Catatan Pesanan">
      {renderCardItem('Order Via', historyDetailDummy.orderNotes.via)}
      {renderCardItem(
        'Tanggal Pembelian',
        detail.data?.createdAt ? toLocalDateTime(detail.data?.createdAt) : '-',
      )}
      {renderCardItem(
        'Tanggal Pembatalan',
        detail.data?.cancelTime
          ? toLocalDateTime(detail.data?.cancelTime)
          : '-',
      )}
      {renderCardItem(
        'Tanggal Pengembalian',
        detail.data?.refundedTime
          ? toLocalDateTime(detail.data?.refundedTime)
          : '-',
      )}
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
    const orderData = detail?.data;
    const paymentData = paymentDetail?.data;
    const billingStatus = paymentData?.billingStatus;
    return paymentData?.paymentType?.id === PAY_NOW &&
      (orderData?.deliveredParcelModified ||
        (orderData?.status === CANCEL &&
          (billingStatus === PAID ||
            billingStatus === REFUND_REQUESTED ||
            billingStatus === REFUNDED))) ? (
      <HistoryDetailCard title="Informasi Pengembalian">
        {renderCardItem(
          'Total Pembayaran Pesanan',
          historyDetailDummy.orderRefund.orderPaidAmount
            ? toCurrency(historyDetailDummy.orderRefund.orderPaidAmount)
            : toCurrency(0),
        )}
        {renderCardItem(
          'Total Pembayaran Pengiriman',
          historyDetailDummy.orderRefund.deliveryFee
            ? toCurrency(historyDetailDummy.orderRefund.deliveryFee)
            : toCurrency(0),
        )}
        {renderCardItem(
          'Total Pengembalian',
          toCurrency(
            historyDetailDummy.orderRefund.orderPaidAmount +
              historyDetailDummy.orderRefund.deliveryFee,
          ),
          'bold',
        )}
      </HistoryDetailCard>
    ) : (
      <View />
    );
  };
  /** => Delivery Detail */
  const renderDeliveryDetail = () => (
    <HistoryDetailCard title="Detail Pengiriman">
      {renderCardItem(
        'Kurir Pengiriman',
        historyDetailDummy.deliveryDetail.courier,
      )}
      {renderCardItem(
        'Alamat Pengiriman',
        historyDetailDummy.deliveryDetail.address,
      )}
    </HistoryDetailCard>
  );
  /** => Product List */
  const renderProductList = () => (
    <View>
      <View style={styles.shadowForBox10}>
        <View style={HistoryDetailStyle.productListCardHeader}>
          <SnbText.B4>Daftar Produk</SnbText.B4>
        </View>
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {products.map((product, productIndex) => (
            <ProductCard.Type1
              key={`${product.name}-${productIndex}`}
              name={product.name}
              imageSource={product.images}
              price={toCurrency(product.price)}
              qty={product.qty}
              originalQty={product.originalQty}
              uom={product.uom}
              total={toCurrency(product.total)}
              originalTotal={
                product.originalTotal
                  ? toCurrency(product.originalTotal)
                  : undefined
              }
            />
          ))}
          {historyDetailDummy.products.length > 2 && (
            <TouchableWithoutFeedback
              onPress={() => setSeeMoreProducts((prev) => !prev)}>
              <View style={HistoryDetailStyle.seeMoreButton}>
                <SnbIcon
                  name={seeMoreProducts ? 'expand_more' : 'expand_less'}
                  color={color.red50}
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <SnbText.B3 color={color.red50}>
                  {seeMoreProducts ? 'Lihat Lebih' : 'Lihat Ringkas'}
                </SnbText.B3>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <HistoryDetailCardDivider horizontalSpaces={16} topSpaces={0} />
        <View style={HistoryDetailStyle.canceledProductListCardHeader}>
          <SnbText.B4>Produk Dibatalkan</SnbText.B4>
        </View>
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {canceledProducts.map((product, productIndex) => (
            <ProductCard.Type1
              key={`${product.name}-${productIndex}`}
              name={product.name}
              imageSource={product.images}
              price={toCurrency(product.price)}
              qty={product.qty}
              uom={product.uom}
              total={toCurrency(product.total)}
            />
          ))}
          {historyDetailDummy.canceledProducts.length > 2 && (
            <TouchableWithoutFeedback
              onPress={() => setSeeMoreCanceledProducts((prev) => !prev)}>
              <View style={HistoryDetailStyle.seeMoreButton}>
                <SnbIcon
                  name={seeMoreCanceledProducts ? 'expand_more' : 'expand_less'}
                  color={color.red50}
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <SnbText.B3 color={color.red50}>
                  {seeMoreCanceledProducts ? 'Lihat Lebih' : 'Lihat Ringkas'}
                </SnbText.B3>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
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
