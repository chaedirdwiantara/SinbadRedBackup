/** === IMPORT PACKAGE HERE === */
import React, { FC, useState } from 'react';
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
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ProductCard } from '@core/components/ProductCard';
import { toCurrency } from '@core/functions/global/currency-format';
import { toLocalDateTime } from '@core/functions/global/date-format';
import { goBack } from '@screen/oms/functions';
import { HistoryDetailStyle } from '@screen/oms/styles';
import {
  HistoryDetailCard,
  HistoryDetailCardDivider,
} from './history-detail.card';
/** === TYPES === */
type HistoryStackParamList = {
  Detail: { section: 'order' | 'payment' };
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
  payment: {
    type: 'Bayar Sekarang',
    method: 'Bank BCA Virtual Account',
    subtotal: 2750000,
    deliveryFee: 0,
    tax: 275000,
    orderTotal: 3025000,
    promo: 20000,
    serviceFee: 4400,
    paymentTotal: 3009400,
    freeProducts: [
      {
        name: 'Quaker Instant Oatmeal 1200gr',
        qty: 5,
        uom: 'pcs',
      },
      {
        name: 'Quaker Instant Oatmeal 400gr',
        qty: 3,
        uom: 'pcs',
      },
    ],
  },
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
const OmsHistoryDetailView: FC = () => {
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
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return (
      <SnbTopNav.Type3
        type="red"
        title={`Detail ${title}`}
        backAction={() => goBack()}
      />
    );
  };
  /** => Header Extension */
  const renderHeaderExtension = () => (
    <View style={HistoryDetailStyle.headerExtension} />
  );
  /** => Order/Payment Status */
  const renderStatus = () => (
    <View style={{ marginBottom: 8, marginTop: 10, marginHorizontal: 16 }}>
      <TouchableWithoutFeedback
        onPress={() => console.log('Go to detail status pressed')}>
        <View style={[HistoryDetailStyle.statusDisplay, styles.shadowForBox10]}>
          <View>
            <SnbText.B4>Status: {historyDetailDummy.status.title}</SnbText.B4>
            <View style={{ marginTop: 8 }}>
              <SnbText.B3>{historyDetailDummy.status.desc}</SnbText.B3>
            </View>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <SnbIcon name="chevron_right" color={color.black100} size={24} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
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
      onActionClick={() => console.log('See invoice pressed')}>
      {renderCardItem('Nomor Pesanan', historyDetailDummy.invoice.orderId)}
      {renderCardItem(
        'Nomor Referensi',
        historyDetailDummy.invoice.referenceId ?? '-',
      )}
    </HistoryDetailCard>
  );
  /** => Order Notes */
  const renderOrderNotes = () => (
    <HistoryDetailCard title="Catatan Pesanan">
      {renderCardItem('Order Via', historyDetailDummy.orderNotes.via)}
      {renderCardItem(
        'Tanggal Pembelian',
        historyDetailDummy.orderNotes.purchaseDate
          ? toLocalDateTime(historyDetailDummy.orderNotes.purchaseDate)
          : '-',
      )}
      {renderCardItem(
        'Tanggal Pembatalan',
        historyDetailDummy.orderNotes.cancelDate
          ? toLocalDateTime(historyDetailDummy.orderNotes.cancelDate)
          : '-',
      )}
      {renderCardItem(
        'Tanggal Pengembalian',
        historyDetailDummy.orderNotes.refundDate
          ? toLocalDateTime(historyDetailDummy.orderNotes.refundDate)
          : '-',
      )}
    </HistoryDetailCard>
  );
  /** => Payment Info */
  const renderPaymentInfo = () => (
    <HistoryDetailCard title="Informasi Pembayaran">
      {renderCardItem('Tipe Pembayaran', historyDetailDummy.payment.type)}
      {renderCardItem('Metode Pembayaran', historyDetailDummy.payment.method)}
      <HistoryDetailCardDivider />
      {renderCardItem(
        'Sub-total pesanan (90)',
        toCurrency(historyDetailDummy.payment.subtotal),
      )}
      {historyDetailDummy.payment.freeProducts.map((product) =>
        renderCardItem(
          `${product.name} (${product.qty} ${product.uom})`,
          'FREE',
          'green',
        ),
      )}
      {renderCardItem(
        'Ongkos Kirim',
        toCurrency(historyDetailDummy.payment.deliveryFee),
      )}
      {renderCardItem('PPN 10%', toCurrency(historyDetailDummy.payment.tax))}
      {renderCardItem(
        'Total Pesanan',
        toCurrency(historyDetailDummy.payment.orderTotal),
        'bold',
      )}
      <HistoryDetailCardDivider />
      {renderCardItem(
        'Promo Pembayaran',
        toCurrency(historyDetailDummy.payment.promo),
      )}
      {renderCardItem(
        'Layanan Pembayaran',
        toCurrency(historyDetailDummy.payment.serviceFee),
      )}
      {renderCardItem(
        'Total Pembayaran Pesanan',
        toCurrency(historyDetailDummy.payment.paymentTotal),
        'bold',
      )}
    </HistoryDetailCard>
  );
  /** => Order Refund Info */
  const renderOrderRefundInfo = () => (
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
  );
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
  /** => Detail Payment Content */
  const renderPaymentDetailContent = () => (
    <ScrollView>
      {renderStatus()}
      {renderInvoiceInfo()}
      {renderPaymentInfo()}
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
      {renderHeaderExtension()}
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
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
      {renderOrderConfirmationDialog()}
    </SnbContainer>
  );
};

export default OmsHistoryDetailView;
