import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import { NavigationAction } from '@navigation';
import {
  MenuStatusFilter,
  SearchInputFilter,
  ListCard,
  HistoryListContext,
} from '@screen/order-history/components/order-history-list';
import { useInitialGetList } from '@screen/order-history/functions/history-list';

// context state history list
const { Provider } = HistoryListContext;

const OrderHistoryList = () => {
  // frist get & get by filter history list
  useInitialGetList();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        type="red"
        title="Pesanan"
        backAction={NavigationAction.back}
      />
      <MenuStatusFilter />
      <SearchInputFilter />
      <ListCard />
    </SnbContainer>
  );
};

// wrap provider history list context
export const OrderHistoryListView = Provider(OrderHistoryList);
