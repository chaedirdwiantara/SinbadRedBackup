import React, { memo, useEffect } from 'react';
import { RefreshControl, ScrollView, View, Text } from 'react-native';
import { SnbContainer, SnbTopNav2 } from '@sinbad/react-native-sinbad-ui';
import {
  StatusOrder,
  InformationInvoice,
  InformationDelivery,
  ListProductOrder,
  InformationPayment,
  ActionFooter,
} from '@screen/order-history/components/order-history-detail';
//function
import { NavigationAction } from '@core/functions/navigation';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useDetailHistoryOrder } from '../../functions/history-detail';
import {
  ConsolidateListOrderDetail,
  InvoiceInformation,
  PaymentInformation,
} from '@screen/order-history/components/order-history-consolidate-detail';

const OrderHistoryConsolidateDetail = () => {
  /** Dummy Data */
  const dummyData = { name: 'SNE-DUMMY-00123' };

  // const {
  //   stateOrderHistory: {
  //     detail: { loading },
  //   },
  // } = useOrderHistoryContext();

  const { get, clear } = useDetailHistoryOrder();
  // get detail data history
  // useEffect(() => {
  //   get();

  //   return () => {
  //     clear();
  //   };
  // }, []);
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type3
        title={dummyData.name}
        color="white"
        backAction={NavigationAction.back}
      />
      <ScrollView
      // refreshControl={
      //   <RefreshControl refreshing={loading} onRefresh={get} />
      // }
      >
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
