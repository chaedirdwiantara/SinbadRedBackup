import React, { memo, useEffect } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav2 } from '@sinbad/react-native-sinbad-ui';
import { NavigationAction } from '@core/functions/navigation';
import {
  OrderTrack,
  OrderHistory,
} from '../../components/order-history-tracking';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useDetailHistoryOrder } from '../../functions/history-tracking-detail';

const HistoryTracking = () => {
  const {
    stateOrderHistory: {
      tracking: { loading },
    },
  } = useOrderHistoryContext();

  const { clear, get } = useDetailHistoryOrder();

  // get detail tracking
  useEffect(() => {
    get();
    return () => {
      clear();
    };
  }, []);
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        title="Detail Status"
        color="white"
        backAction={NavigationAction.back}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={get} />
        }>
        <OrderTrack />
        <OrderHistory />
      </ScrollView>
    </SnbContainer>
  );
};

export const HistoryTrackingView = memo(HistoryTracking);
