/** === IMPORT PACKAGES === */
import React, { FC, useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import { SnbContainer, SnbTopNav, SnbTabs } from 'react-native-sinbad-ui';
import { useFocusEffect } from '@react-navigation/native';
/** === IMPORT COMPONENTS === */
import {
  HistoryCard,
  HistoryFilterModal,
  HistoryListFilters,
  HistoryListStatusTags,
} from '../components';
/** === IMPORT FUNCTIONS === */
import {
  useOrderStatusActions,
  usePaymentStatus,
  useHistoryListActions,
  goBack,
  goToHistoryDetail,
} from '@screen/history/functions';
import { useHistoryContext } from 'src/data/contexts/history/useHistoryContext';
/** === IMPORT TYPE === */
import * as models from '@models';
import { OrderStatusQuery, PaymentStatusQuery } from '@models';
/** === CONSTANT === */
const historyTabs = ['Tagihan', 'Order'];
/** === COMPONENT === */
const HistoryListView: FC = () => {
  /** === HOOKS === */
  const [activeTab, setActiveTab] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [activePaymentStatus, setActivePaymentStatus] =
    useState<models.PaymentStatusQuery>('');
  const [activeOrderStatus, setActiveOrderStatus] =
    useState<models.OrderStatusQuery>('');
  const [date, setDate] = useState({ start: '', end: '' });
  const [isFiltered, setIsFiltered] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const getPaymentStatus = usePaymentStatus();
  const orderStatusActions = useOrderStatusActions();
  const historyListActions = useHistoryListActions();
  const {
    stateHistory: {
      list: historyListState,
      paymentStatus: paymentStatusState,
      orderStatus: orderStatusState,
    },
    dispatchHistory,
  } = useHistoryContext();

  useFocusEffect(
    useCallback(() => {
      if (activeTab === 0) {
        setActiveOrderStatus('');
      } else {
        setActivePaymentStatus('');
      }

      historyListActions.fetch(dispatchHistory);
    }, [activeTab]),
  );

  useEffect(() => {
    getPaymentStatus.list(dispatchHistory);
    orderStatusActions.fetch(dispatchHistory);
  }, []);
  /** === FUNCTIONS === */
  const handleDateChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setDate({ ...date, start: value });
    } else {
      setDate({ ...date, end: value });
    }
  };

  const handleDateReset = () => {
    setDate({ start: '', end: '' });
  };
  /** === DERIVED === */
  const derivedQueryOptions: models.HistoryListQueryOptions = {
    statusOrder: activeOrderStatus,
    statusPayment: activePaymentStatus,
    startDate: date.start,
    endDate: date.end,
    search: keyword,
  };
  /** === VIEW === */
  /** => Payment Item */
  const renderPaymentItem = ({
    item,
    index,
  }: {
    item: models.OrderParcels;
    index: number;
  }) => {
    const statusTitle =
      paymentStatusState.data.filter(
        (statusItem) => statusItem.status === item.statusPayment,
      )[0]?.title ?? 'Menunggu Pembayaran';
    const beenDelivered = item.status === 'delivered' || item.status === 'done';
    const price = item.parcelFinalPriceBuyer;
    const finalPrice = item.deliveredParcelFinalPriceBuyer;

    return (
      <HistoryCard
        key={item.id}
        type="payment"
        orderCode={item.orderCode}
        createdAt={item.createdAt}
        statusSlug={item.statusPayment ?? 'waiting_for_payment'}
        statusTitle={statusTitle}
        expiredPaymentTime={item.billing.expiredPaymentTime}
        catalogueImages={item.catalogueImages}
        price={price}
        finalPrice={
          beenDelivered && price !== finalPrice ? finalPrice : undefined
        }
        qty={item.parcelQty}
        finalQty={
          beenDelivered && item.parcelQty !== item.deliveredParcelQty
            ? item.deliveredParcelQty
            : undefined
        }
        onCardPress={() => goToHistoryDetail('payment', item.id)}
        style={
          index === historyListState.data.length - 1 ? { marginBottom: 24 } : {}
        }
      />
    );
  };
  /** => Order Item */
  const renderOrderItem = ({
    item,
    index,
  }: {
    item: models.OrderParcels;
    index: number;
  }) => {
    const statusTitle = orderStatusState.data.filter(
      (statusItem) => statusItem.status === item.status,
    )[0]?.title;
    const beenDelivered = item.status === 'delivered' || item.status === 'done';
    const price = item.parcelFinalPriceBuyer;
    const finalPrice = item.deliveredParcelFinalPriceBuyer;

    return (
      <HistoryCard
        key={item.id}
        type="order"
        orderCode={item.orderCode}
        createdAt={item.createdAt}
        statusSlug={item.status}
        statusTitle={statusTitle}
        expiredPaymentTime={item.billing.expiredPaymentTime}
        catalogueImages={item.catalogueImages}
        price={price}
        finalPrice={
          beenDelivered && price !== finalPrice ? finalPrice : undefined
        }
        qty={item.parcelQty}
        finalQty={
          beenDelivered && item.parcelQty !== item.deliveredParcelQty
            ? item.deliveredParcelQty
            : undefined
        }
        onCardPress={() => goToHistoryDetail('order', item.id)}
        style={
          index === historyListState.data.length - 1 ? { marginBottom: 24 } : {}
        }
      />
    );
  };
  /** => Main */
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 type="red" title="Pesanan" backAction={goBack} />
      <SnbTabs.Fixed
        tabs={historyTabs}
        activeTabs={activeTab}
        onChangeActiveTabs={(tabIndex: number) => setActiveTab(tabIndex)}
      />
      <HistoryListFilters
        onSearch={() =>
          historyListActions.fetch(dispatchHistory, derivedQueryOptions)
        }
        keyword={keyword}
        onKeywordChange={(text: string) => setKeyword(text)}
        onSearchClear={() => {
          setKeyword('');
          historyListActions.fetch(dispatchHistory, {
            ...derivedQueryOptions,
            search: '',
          });
        }}
        onFilterPress={() => setFilterModalVisible(true)}
        isFiltered={isFiltered}
      />
      {activeTab === 0 ? (
        <HistoryListStatusTags
          visible={
            !paymentStatusState.loading && paymentStatusState.data !== null
          }
          data={paymentStatusState.data}
          activeStatus={activePaymentStatus}
          onTagPress={(tag) => {
            setActivePaymentStatus(tag.status as PaymentStatusQuery);
            historyListActions.fetch(dispatchHistory, {
              ...derivedQueryOptions,
              statusPayment: tag.status as PaymentStatusQuery,
            });
          }}
        />
      ) : (
        <HistoryListStatusTags
          visible={!orderStatusState.loading && orderStatusState.data !== null}
          data={orderStatusState.data}
          activeStatus={activeOrderStatus}
          onTagPress={(tag) => {
            setActiveOrderStatus(tag.status as OrderStatusQuery);
            historyListActions.fetch(dispatchHistory, {
              ...derivedQueryOptions,
              statusOrder: tag.status as OrderStatusQuery,
            });
          }}
        />
      )}
      <FlatList
        style={{ padding: 8 }}
        data={historyListState.data}
        renderItem={activeTab === 0 ? renderPaymentItem : renderOrderItem}
        refreshing={historyListState.refresh}
        onRefresh={() =>
          historyListActions.refresh(dispatchHistory, derivedQueryOptions)
        }
        onEndReachedThreshold={0.1}
        onEndReached={() =>
          historyListActions.loadMore(
            dispatchHistory,
            historyListState,
            derivedQueryOptions,
          )
        }
      />
      <HistoryFilterModal
        visible={filterModalVisible}
        startDate={date.start}
        endDate={date.end}
        onDateChange={handleDateChange}
        onDateReset={handleDateReset}
        onClose={() => setFilterModalVisible(false)}
        onSubmit={() => {
          if (!date.start && !date.end) {
            setIsFiltered(false);
          } else {
            setIsFiltered(true);
          }

          setFilterModalVisible(false);
          historyListActions.fetch(dispatchHistory, derivedQueryOptions);
        }}
      />
    </SnbContainer>
  );
};

export default HistoryListView;
