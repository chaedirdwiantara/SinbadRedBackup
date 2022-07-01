import React, { memo, useEffect } from 'react';
import { RefreshControl, ScrollView, View, Text } from 'react-native';
import { SnbContainer, SnbTopNav2 } from '@sinbad/react-native-sinbad-ui';
//function
import { NavigationAction } from '@core/functions/navigation';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useConsolidateDetailHistoryOrder } from '../../functions/history-consolidate-detail';
import {
  ConsolidateListOrderDetail,
  InvoiceInformation,
  PaymentInformation,
  ActionFooter,
} from '@screen/order-history/components/order-history-consolidate-detail';

const OrderHistoryConsolidateDetail = () => {
  const {
    stateOrderHistory: {
      consolidateDetail: { loading, data },
    },
  } = useOrderHistoryContext();

  const { get, clear } = useConsolidateDetailHistoryOrder();
  // get consolidate detail data history
  useEffect(() => {
    get();

    return () => {
      clear();
    };
  }, []);
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        title={data?.orderId}
        color="white"
        backAction={NavigationAction.back}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={get} />
        }>
        <InvoiceInformation />
        <PaymentInformation />
        <ConsolidateListOrderDetail />
      </ScrollView>
      <ActionFooter />
    </SnbContainer>
  );
};

export const OrderHistoryConsolidateDetailView = memo(
  OrderHistoryConsolidateDetail,
);
