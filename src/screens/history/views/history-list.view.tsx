/** === IMPORT PACKAGES === */
import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbTabs } from 'react-native-sinbad-ui';
import { useFocusEffect } from '@react-navigation/native';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
/** === IMPORT COMPONENTS === */
import BottomSheetError from '@core/components/BottomSheetError';
import { EmptyState } from '@core/components/EmptyState';
import { LoadingLoadMore } from '@core/components/Loading';
import {
  HistoryCard,
  HistoryFilterModal,
  HistoryListFilters,
  HistoryListStatusTags,
  HistoryListSkeleton,
  HistoryStatusSkeleton,
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
import { copilotOptions } from '@screen/account/views/shared';
import { useCoachmark } from '@screen/account/functions';
/** === IMPORT TYPE === */
import * as models from '@models';
import { additionalOrderStatusList } from '../types';
/** === CONSTANT === */
const historyTabs = ['Tagihan', 'Order'];
const CopilotView = walkthroughable(View);
/** === COMPONENT === */
const HistoryListView: FC = ({ navigation, start }: any) => {
  /** === HOOKS === */
  const [activeTab, setActiveTab] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [activePaymentStatus, setActivePaymentStatus] =
    useState<models.PaymentStatusQuery>('');
  const [activeOrderStatus, setActiveOrderStatus] =
    useState<models.OrderStatusQuery>('');
  const [date, setDate] = useState({ start: '', end: '' });
  const [isFiltered, setIsFiltered] = useState(0);
  const [isSearched, setIsSearched] = useState(0);
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
  const { coachmarkState } = useCoachmark();
  const historyPaymentList = useMemo(
    () =>
      historyListState.data.filter(
        (payment) =>
          payment.status !== 'created' && payment.status !== 'failed',
      ),
    [historyListState.data],
  );

  useFocusEffect(
    useCallback(() => {
      if (activeTab === 0) {
        setActiveOrderStatus('');
      } else {
        setActivePaymentStatus('');
      }

      historyListActions.fetch(dispatchHistory, {
        startDate: date.start,
        endDate: date.end,
        search: keyword,
      });
    }, [activeTab, isFiltered, isSearched]),
  );

  useEffect(() => {
    getPaymentStatus.list(dispatchHistory);
    orderStatusActions.fetch(dispatchHistory);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setActiveOrderStatus('');
      setActivePaymentStatus('');
    });

    return unsubscribe;
  }, [navigation]);

  //function for start couchmark
  useEffect(() => {
    if (typeof coachmarkState.data?.homeCoachmark === 'boolean') {
      if (coachmarkState?.data?.orderCoachmark === false) {
        setTimeout(() => {
          start();
        }, 100);
      }
    }
  }, [coachmarkState?.data?.orderCoachmark]);
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
  /** === DERIVEDS === */
  const derivedQueryOptions: models.HistoryListQueryOptions = {
    statusOrder: activeOrderStatus,
    statusPayment: activePaymentStatus,
    startDate: date.start,
    endDate: date.end,
    search: keyword,
  };
  const statusListLoading =
    paymentStatusState.loading || orderStatusState.loading;
  const successStateForPayments =
    !historyListState.loading && historyPaymentList.length > 0;
  const successStateForOrders =
    !historyListState.loading && historyListState.data.length > 0;
  const emptyStateForPayments =
    !historyListState.loading && historyPaymentList.length === 0;
  const emptyStateForOrders =
    !historyListState.loading && historyListState.data.length === 0;
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
    const price = item.billing.totalPayment ?? item.parcelFinalPriceBuyer ?? 0;
    const finalPrice = item.billing.deliveredTotalPayment!;

    return (
      <HistoryCard
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
        onCardPress={() => {
          if (item.status !== 'created' && item.status !== 'failed') {
            goToHistoryDetail('payment', item.orderParcelId, item.billing.id!);
          }
        }}
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
    const statusTitle = [
      ...orderStatusState.data,
      ...additionalOrderStatusList,
    ].filter((statusItem) => statusItem.status === item.status)[0]?.title;
    const beenDelivered = item.status === 'delivered' || item.status === 'done';
    const price = item.parcelFinalPriceBuyer;
    const finalPrice = item.deliveredParcelFinalPriceBuyer;

    return (
      <HistoryCard
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
        onCardPress={() => {
          if (item.status !== 'created' && item.status !== 'failed') {
            goToHistoryDetail('order', item.orderParcelId, item?.billing.id!);
          }
        }}
        style={
          index === historyListState.data.length - 1 ? { marginBottom: 24 } : {}
        }
      />
    );
  };
  /** => Status Tags */
  const displayedStatusList =
    activeTab === 0 ? (
      <HistoryListStatusTags
        visible={
          !paymentStatusState.loading && paymentStatusState.data !== null
        }
        data={paymentStatusState.data}
        activeStatus={activePaymentStatus}
        onTagPress={(tag) => {
          setActivePaymentStatus(tag.status as models.PaymentStatusQuery);
          historyListActions.fetch(dispatchHistory, {
            ...derivedQueryOptions,
            statusPayment: tag.status as models.PaymentStatusQuery,
          });
        }}
        activeTab={activeTab}
      />
    ) : (
      <HistoryListStatusTags
        visible={!orderStatusState.loading && orderStatusState.data !== null}
        data={orderStatusState.data}
        activeStatus={activeOrderStatus}
        onTagPress={(tag) => {
          setActiveOrderStatus(tag.status as models.OrderStatusQuery);
          historyListActions.fetch(dispatchHistory, {
            ...derivedQueryOptions,
            statusOrder: tag.status as models.OrderStatusQuery,
          });
        }}
        activeTab={activeTab}
      />
    );
  /** => History List */
  const historyList = (
    <FlatList
      style={{ padding: 8 }}
      contentContainerStyle={{ paddingBottom: 12 }}
      data={activeTab === 0 ? historyPaymentList : historyListState.data}
      renderItem={activeTab === 0 ? renderPaymentItem : renderOrderItem}
      refreshing={historyListState.refresh}
      onRefresh={() =>
        historyListActions.refresh(dispatchHistory, derivedQueryOptions)
      }
      keyExtractor={(item) => item.orderCode}
      onEndReachedThreshold={0.1}
      onEndReached={() =>
        historyListActions.loadMore(
          dispatchHistory,
          historyListState,
          derivedQueryOptions,
        )
      }
    />
  );
  //walkthrough couchmark
  const couchmarkWalkthrough = () => {
    if (
      typeof coachmarkState?.data?.orderCoachmark === 'boolean' &&
      coachmarkState?.data?.orderCoachmark === false
    ) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <CopilotStep
              text="Semua tagihan dari pembelian Anda bisa dilihat disini."
              order={1}
              name="Lihat tagihan Anda">
              <CopilotView
                style={{
                  height: 45,
                  width: '100%',
                  position: 'absolute',
                  marginTop: -46,
                  elevation: -100,
                }}
              />
            </CopilotStep>
          </View>
          <View style={{ flex: 1 }}>
            <CopilotStep
              text="Semua pesanan Anda bisa dilihat disini."
              order={2}
              name="Lihat pesanan Anda">
              <CopilotView
                style={{
                  height: 45,
                  width: '100%',
                  position: 'absolute',
                  marginTop: -46,
                  elevation: -100,
                }}
              />
            </CopilotStep>
          </View>
        </View>
      );
    }
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
      {couchmarkWalkthrough()}
      <HistoryListFilters
        onSearch={() => {
          if (keyword === '') {
            setIsSearched(0);
          } else {
            setIsSearched((prev) => prev + 1);
          }
        }}
        keyword={keyword}
        onKeywordChange={(text: string) => setKeyword(text)}
        onSearchClear={() => {
          setKeyword('');
          setIsSearched(0);
        }}
        onFilterPress={() => setFilterModalVisible(true)}
        isFiltered={isFiltered > 0}
      />
      {statusListLoading ? <HistoryStatusSkeleton /> : displayedStatusList}
      {historyListState.loading && <HistoryListSkeleton />}
      {activeTab === 0
        ? successStateForPayments && historyList
        : successStateForOrders && historyList}
      {activeTab === 0
        ? emptyStateForPayments && (
            <View style={{ flex: 1, paddingBottom: 32 }}>
              <EmptyState title="Data Kosong" description="Belum Ada Tagihan" />
            </View>
          )
        : emptyStateForOrders && (
            <View style={{ flex: 1, paddingBottom: 32 }}>
              <EmptyState title="Data Kosong" description="Belum Ada Pesanan" />
            </View>
          )}
      {historyListState.loadMore && (
        <View style={{ marginBottom: 16 }}>
          <LoadingLoadMore />
        </View>
      )}
      <HistoryFilterModal
        visible={filterModalVisible}
        startDate={date.start}
        endDate={date.end}
        onDateChange={handleDateChange}
        onDateReset={handleDateReset}
        onClose={() => setFilterModalVisible(false)}
        onSubmit={() => {
          if (!date.start && !date.end) {
            setIsFiltered(0);
          } else {
            setIsFiltered((prev) => prev + 1);
          }

          setFilterModalVisible(false);
        }}
      />
      <BottomSheetError
        open={Boolean(historyListState.error)}
        error={historyListState.error}
        closeAction={() => {
          setDate({ start: '', end: '' });
          // Will trigger fetch
          setIsFiltered(0);
        }}
        retryAction={() =>
          historyListActions.fetch(dispatchHistory, derivedQueryOptions)
        }
      />
    </SnbContainer>
  );
};

export default copilot(copilotOptions(2, 'orderCoachmark'))(HistoryListView);
