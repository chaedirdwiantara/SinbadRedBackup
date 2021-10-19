/** === IMPORT PACKAGE HERE === */
import React, { FC, useState } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbTabs,
  SnbTextField,
  SnbIcon,
  SnbButton,
  color,
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack } from '@screen/history/functions';
import { HistoryStyle } from '@screen/history/styles';
import { HistoryCard, HistoryStatusColor } from '../components';
/** === TYPES === */
type PaymentStatusKey = typeof paymentStatus[number]['key'];
type OrderStatusKey = typeof orderStatus[number]['key'];
interface HistoryItem {
  id: string;
  createdAt: string;
  status: { key: PaymentStatusKey | OrderStatusKey; value: string };
  expiredPaymentTime?: string;
  products: Array<string>;
  totalPrice: number;
  originalTotalPrice?: number;
  totalQty: number;
  originalTotalQty?: number;
  partial?: boolean;
}
/** === CONSTANTS AND DUMMIES === */
const historyTabs = ['Tagihan', 'Order'];
const paymentStatus = [
  { key: 'waiting_for_payment', value: 'Menunggu Pembayaran' },
  { key: 'unpaid', value: 'Tidak Dibayar' },
  { key: 'overdue', value: 'Overdue' },
  { key: 'paid', value: 'Dibayar' },
  { key: 'waiting_for_refund', value: 'Menunggu Pengembalian' },
  { key: 'refunded', value: 'Dikembalikan' },
] as const;
const orderStatus = [
  { key: 'confirmation', value: 'Menunggu Konfirmasi' },
  { key: 'verified', value: 'Verifikasi' },
  { key: 'on_packing', value: 'Dikemas' },
  { key: 'on_delivery', value: 'Dikirim' },
  { key: 'delivered', value: 'Diterima' },
  { key: 'done', value: 'Selesai' },
  { key: 'partial_pending', value: 'Pending Partial' },
  { key: 'supplier_pending', value: 'Pending Supplier' },
  { key: 'canceled', value: 'Batal' },
] as const;
const paymentStatusColor: Record<PaymentStatusKey, keyof HistoryStatusColor> = {
  waiting_for_payment: 'yellow',
  unpaid: 'white',
  overdue: 'red',
  paid: 'green',
  waiting_for_refund: 'yellow',
  refunded: 'green',
};
const orderStatusColor: Record<OrderStatusKey, keyof HistoryStatusColor> = {
  confirmation: 'yellow',
  verified: 'white',
  on_packing: 'white',
  on_delivery: 'white',
  delivered: 'green',
  done: 'green',
  partial_pending: 'yellow',
  supplier_pending: 'yellow',
  canceled: 'red',
};
const payments: Array<HistoryItem> = [
  {
    id: 'SNB18120000708',
    status: { key: 'waiting_for_payment', value: 'Menunggu Pembayaran' },
    createdAt: new Date(2021, 8, 27, 16, 46).toISOString(),
    expiredPaymentTime: new Date(2021, 8, 30, 14, 16).toISOString(),
    totalPrice: 300000,
    totalQty: 10,
    products: [
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
    ],
  },
  {
    id: 'SNB18120000709',
    status: { key: 'waiting_for_refund', value: 'Menunggu Pengembalian' },
    createdAt: new Date(2021, 8, 27, 12, 46).toISOString(),
    totalPrice: 200000,
    originalTotalPrice: 400000,
    totalQty: 3,
    originalTotalQty: 6,
    products: [
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67145109.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/21158106.png',
    ],
  },
  {
    id: 'SNB18120000707',
    status: { key: 'overdue', value: 'Overdue' },
    createdAt: new Date(2021, 8, 27, 16, 46).toISOString(),
    totalPrice: 450000,
    totalQty: 3,
    products: [
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
    ],
  },
];
const orders: Array<HistoryItem> = [
  {
    id: 'SNB18120000722',
    status: { key: 'verified', value: 'Verifikasi' },
    createdAt: new Date(2021, 8, 27, 16, 46).toISOString(),
    expiredPaymentTime: new Date(2021, 9, 1, 16, 46).toISOString(),
    totalPrice: 300000,
    originalTotalPrice: 600000,
    totalQty: 10,
    originalTotalQty: 20,
    products: [
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
    ],
  },
  {
    id: 'SNB18120000721',
    status: { key: 'done', value: 'Selesai' },
    createdAt: new Date(2021, 8, 27, 12, 46).toISOString(),
    totalPrice: 200000,
    totalQty: 3,
    products: [
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67145109.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/21158106.png',
    ],
  },
  {
    id: 'SNB18120000720',
    status: { key: 'canceled', value: 'Batal' },
    createdAt: new Date(2021, 8, 27, 16, 46).toISOString(),
    totalPrice: 450000,
    totalQty: 3,
    products: [
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
    ],
  },
  {
    id: 'SNB18120000729',
    status: { key: 'on_delivery', value: 'Dikirim' },
    partial: true,
    createdAt: new Date(2021, 8, 27, 16, 46).toISOString(),
    totalPrice: 450000,
    totalQty: 3,
    products: [
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67400566.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
      'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67201003.png',
    ],
  },
];
/** === COMPONENT === */
const HistoryListView: FC = () => {
  /** === HOOK === */
  const [activeTab, setActiveTab] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [activePaymentStatus, setActivePaymentStatus] = useState<
    typeof paymentStatus[number]['key'] | ''
  >('');
  const [activeOrderStatus, setActiveOrderStatus] = useState<
    typeof orderStatus[number]['key'] | ''
  >('');
  /** === VIEW === */
  /** => Header */
  const renderHeader = () => {
    return <SnbTopNav.Type3 type="red" title="Pesanan" backAction={goBack} />;
  };
  /** => Tabs */
  const renderTabs = () => (
    <SnbTabs.Fixed
      tabs={historyTabs}
      activeTabs={activeTab}
      onChangeActiveTabs={(tabIndex: number) => setActiveTab(tabIndex)}
    />
  );
  /** => Filters */
  const renderFilters = () => (
    <View style={HistoryStyle.filterContainer}>
      <View style={{ flex: 7 }}>
        <SnbTextField.Text
          boxIndicator={true}
          enter={() => console.log('Search pressed')}
          placeholder="Cari produk, nomor pesanan"
          type="default"
          value={keyword}
          onChangeText={(text: string) => setKeyword(text)}
          clearText={() => setKeyword('')}
          returnKeyType="search"
          keyboardType="default"
          prefixIconName="search"
        />
      </View>
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => console.log('Filter pressed')}>
        <View style={{ alignItems: 'center', paddingLeft: 12 }}>
          <SnbIcon name="filter_list" color={color.black60} size={32} />
          <SnbText.C3 color={color.black60}>Filter</SnbText.C3>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
  /** => Status List */
  const renderStatusList = () => {
    // ini nanti diganti
    const statusList = activeTab === 0 ? paymentStatus : orderStatus;
    const activeStatus =
      activeTab === 0 ? activePaymentStatus : activeOrderStatus;
    const setActiveStatus =
      activeTab === 0 ? setActivePaymentStatus : setActiveOrderStatus;

    return (
      <View>
        <ScrollView
          horizontal={true}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}
          showsHorizontalScrollIndicator={false}>
          <View style={{ marginRight: 16 }}>
            <SnbButton.Dynamic
              title="Semua"
              type={activeStatus === '' ? 'primary' : 'secondary'}
              size="small"
              onPress={() => setActiveStatus('')}
            />
          </View>
          {statusList.map((status) => (
            <View key={status.key} style={{ marginRight: 16 }}>
              <SnbButton.Dynamic
                title={status.value}
                type={status.key === activeStatus ? 'primary' : 'secondary'}
                size="small"
                onPress={() => setActiveStatus(status.key as any)}
              />
            </View>
          ))}
          <View style={{ width: 16 }} />
        </ScrollView>
      </View>
    );
  };
  /** => Payment List */
  const renderPaymentList = () => (
    <>
      {payments.map((payment, paymentIndex) => {
        const statusColor =
          paymentStatusColor[payment.status.key as PaymentStatusKey];

        return (
          <HistoryCard
            key={payment.id}
            id={payment.id}
            createdAt={payment.createdAt}
            status={payment.status.value}
            statusColor={statusColor}
            statusIconName={
              payment.status.key === 'overdue' ? 'error' : undefined
            }
            expiredPaymentTime={payment.expiredPaymentTime}
            productImages={payment.products}
            totalPrice={payment.totalPrice}
            originalTotalPrice={payment.originalTotalPrice}
            totalQty={payment.totalQty}
            originalTotalQty={payment.originalTotalQty}
            style={
              paymentIndex === payments.length - 1 ? { marginBottom: 24 } : {}
            }
          />
        );
      })}
    </>
  );
  /** => Order List */
  const renderOrderList = () => (
    <>
      {orders.map((order, orderIndex) => {
        const statusColor =
          orderStatusColor[order.status.key as OrderStatusKey];
        let action: {
          title?: string;
          type?: 'primary' | 'secondary';
          onClick?: () => void;
        } = {};

        if (order.status.key === 'verified') {
          action.title = 'Batal';
          action.type = 'secondary';
          action.onClick = () => console.log('Cancel pressed');
        } else if (order.status.key === 'done') {
          action.title = 'Beli Lagi';
          action.type = 'primary';
          action.onClick = () => console.log('Buy again pressed');
        }

        return (
          <HistoryCard
            key={order.id}
            id={order.id}
            createdAt={order.createdAt}
            status={order.status.value}
            statusColor={statusColor}
            statusIconName={
              order.status.key === 'overdue' ? 'error' : undefined
            }
            expiredPaymentTime={order.expiredPaymentTime}
            productImages={order.products}
            totalPrice={order.totalPrice}
            originalTotalPrice={order.originalTotalPrice}
            totalQty={order.totalQty}
            originalTotalQty={order.originalTotalQty}
            style={orderIndex === orders.length - 1 ? { marginBottom: 24 } : {}}
            actionButtonTitle={action.title}
            actionButtonType={action.type}
            onActionButtonPress={action.onClick}
            additionalInfo={
              order.partial ? 'Terjadi Pengiriman Sebagian' : undefined
            }
          />
        );
      })}
    </>
  );
  /** => History List */
  const renderHistoryList = () => {
    return (
      <ScrollView style={{ padding: 8 }}>
        {activeTab === 0 ? renderPaymentList() : renderOrderList()}
      </ScrollView>
    );
  };
  /** => Content */
  const renderContent = () => (
    <>
      {renderTabs()}
      {renderFilters()}
      {renderStatusList()}
      {renderHistoryList()}
    </>
  );
  /** => Main */
  return (
    <SnbContainer color="white">
      {renderHeader()}
      {renderContent()}
    </SnbContainer>
  );
};

export default HistoryListView;
