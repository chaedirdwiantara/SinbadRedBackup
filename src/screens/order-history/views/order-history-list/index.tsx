import React, { useEffect } from 'react';
import { SnbContainer, SnbTopNav2 } from 'react-native-sinbad-ui';
import {
  MenuStatusFilter,
  MenuSubStatusFilter,
  SearchInputFilter,
  ListCard,
  HistoryListContext,
} from '@screen/order-history/components/order-history-list';
import { useInitialGetList } from '@screen/order-history/functions/history-list';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import { copilotOptions } from '@screen/account/views/shared';
import { View } from 'react-native';
import { useCoachmark } from '@screen/account/functions';
import { NavigationAction } from '@navigation';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';

const goBack = () => {
  NavigationAction.back();
};
const CopilotView = walkthroughable(View);

// context state history list
const { Provider } = HistoryListContext;

const OrderHistoryList = ({ start }: any) => {
  const { coachmarkState } = useCoachmark();

  const {
    stateOrderHistory: {
      menuStatus: { data },
    },
  } = useOrderHistoryContext();

  React.useEffect(() => {
    if (
      typeof coachmarkState.data?.orderCoachmark === 'boolean' &&
      coachmarkState.data?.orderCoachmark === false &&
      data.length > 0
    ) {
      start();
    }
  }, [coachmarkState.data, data]);

  // first get & get by filter history list
  useInitialGetList();
  return (
    <SnbContainer color="white">
      <SnbTopNav2.Type1
        title="Pesanan"
        color="white"
      />
      <View>
        <CopilotStep
          text="Cek status pesanan yang Anda telah buat dibagian ini"
          order={1}
          name="Status Pesanan">
          <CopilotView>
            <MenuStatusFilter />
          </CopilotView>
        </CopilotStep>
      </View>
      <SearchInputFilter />
      <MenuSubStatusFilter />
      <ListCard />
    </SnbContainer>
  );
};

// wrap provider history list context
export const OrderHistoryListView = copilot(
  copilotOptions(0, 'orderCoachmark'),
)(Provider(OrderHistoryList));
