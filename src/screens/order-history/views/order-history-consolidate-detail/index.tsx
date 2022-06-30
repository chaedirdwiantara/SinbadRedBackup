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

const OrderHistoryConsolidateDetail = () => {
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
        title="Consolidate Detail"
        color="white"
        backAction={NavigationAction.back}
      />
      <ScrollView
      // refreshControl={
      //   <RefreshControl refreshing={loading} onRefresh={get} />
      // }
      >
        <View>
          <Text>Consolidate Order Page</Text>
        </View>
      </ScrollView>
      <ActionFooter />
    </SnbContainer>
  );
};

export const OrderHistoryConsolidateDetailView = memo(
  OrderHistoryConsolidateDetail,
);
