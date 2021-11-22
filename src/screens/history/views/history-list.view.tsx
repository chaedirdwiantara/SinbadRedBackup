/** === IMPORT PACKAGE HERE === */
import React, { FC, useEffect, useState } from 'react';
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import {
  SnbContainer,
  SnbTopNav,
  SnbText,
  SnbTabs,
  SnbTextField,
  SnbIcon,
  color,
  SnbChips,
} from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { goBack, goToHistoryDetail } from '../functions';
import { HistoryStyle } from '../styles';
import { HistoryCard, HistoryStatusColor } from '../components';
import { useOrderStatusActions } from '@screen/history/functions/history-list/history-list.hook.function';
import { contexts } from '@contexts';
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
const payments = {
  meta: {
    total: 100,
    skip: 0,
    limit: 10,
  },
  data: [
    {
      id: 1,
      orderCode: 'S010001000105508',
      createdAt: '2021-08-18T02:36:12.812Z',
      parcelFinalPrice: 0,
      parcelFinalPriceBuyer: null,
      parcelQty: 10,
      deliveredParcelFinalPrice: 10,
      deliveredParcelFinalPriceBuyer: null,
      deliveredParcelQty: 0,
      deliveredParcelModified: false,
      statusPayment: 'paid',
      status: 'delivered',
      billing: {
        id: 2,
        totalPayment: 10000,
        deliveredTotalPayment: 10000,
        billingStatus: 'paid',
        paymentTypeId: 1,
        paymentChannelId: 1,
        expiredPaymentTime: '2021-07-30T15:14:02Z',
        paymentChannelTypeId: 1,
      },
      products: [
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/67145109.png',
        'https://sinbad-website.s3.amazonaws.com/odoo_img/product/21158106.png',
      ],
    },
  ],
};
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
  const [activePaymentStatus, setActivePaymentStatus] = useState('');
  const [activeOrderStatus, setActiveOrderStatus] = useState('');
  const getOrderStatus = useOrderStatusActions();
  const getHistoryList = () => console.log('Get History List');

  /**
   * GET ORDER STATUS
   */
  const { dispatchOrderStatus, stateOrderStatus } = React.useContext(
    contexts.OrderStatusContext,
  );
  useEffect(() => {
    getOrderStatus.fetch(dispatchOrderStatus);
    getHistoryList();
  }, []);

  /** GET HISTORY LIST */
  useEffect(() => {
    console.log(activeTab === 0 ? 'Payment Tab' : 'Order Tab');
    console.log('Order Status', activeOrderStatus);
    console.log('Payment Status', activePaymentStatus);
    activeTab === 0 ? setActiveOrderStatus('') : setActivePaymentStatus('');
    getHistoryList();
  }, [activeOrderStatus, activePaymentStatus, activeTab]);
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
    const activeStatus =
      activeTab === 0 ? activePaymentStatus : activeOrderStatus;
    const setActiveStatus =
      activeTab === 0 ? setActivePaymentStatus : setActiveOrderStatus;

    const statusList =
      activeTab === 0
        ? stateOrderStatus.orderStatus
        : stateOrderStatus.orderStatus;

    return !statusList.loading && statusList.data !== null ? (
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
          }}>
          {statusList.data.map((status, index) => (
            <View key={index} style={{ marginRight: 16 }}>
              <SnbChips.Choice
                text={status.title}
                status={status.status === activeStatus ? 'active' : 'inactive'}
                onPress={() => setActiveStatus(status.status as any)}
              />
            </View>
          ))}
          <View style={{ width: 16 }} />
        </ScrollView>
      </View>
    ) : (
      <View />
    );
  };
  /** => Payment List */
  const renderPaymentList = () => (
    <>
      {payments.data.map((payment, paymentIndex) => {
        const statusColor =
          paymentStatusColor[payment.statusPayment as PaymentStatusKey];

        return (
          <HistoryCard
            key={payment.id}
            id={payment.orderCode}
            createdAt={payment.createdAt}
            status={payment.statusPayment}
            statusColor={statusColor}
            statusIconName={
              payment.statusPayment === 'overdue' ? 'error' : undefined
            }
            expiredPaymentTime={payment.billing.expiredPaymentTime}
            productImages={payment.products}
            totalPrice={payment.billing.deliveredTotalPayment}
            originalTotalPrice={payment.billing.totalPayment}
            totalQty={payment.parcelQty}
            originalTotalQty={payment.deliveredParcelQty}
            style={
              paymentIndex === payments.data.length - 1
                ? { marginBottom: 24 }
                : {}
            }
            onCardPress={() => goToHistoryDetail('payment')}
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
            onCardPress={() => goToHistoryDetail('order')}
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
