import React from 'react';
import { SnbContainer, SnbTopNav } from 'react-native-sinbad-ui';
import {
  MenuStatusFilter,
  SearchInputFilter,
  ListCard,
  HistoryListContext,
} from '@screen/order-history/components/order-history-list';
import { useInitialGetList } from '@screen/order-history/functions/history-list';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import { copilotOptions } from '@screen/account/views/shared';
import { View } from 'react-native';
import { useCoachmark } from '@screen/account/functions';

const CopilotView = walkthroughable(View);

// context state history list
const { Provider } = HistoryListContext;

const OrderHistoryList = ({ start }: any) => {
  const { coachmarkState } = useCoachmark();

  React.useEffect(() => {
    if (typeof coachmarkState.data?.orderCoachmark === 'boolean' && coachmarkState.data?.orderCoachmark == false) {
      start();
    }
  }, [coachmarkState.data]);
  // frist get & get by filter history list
  useInitialGetList();
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type1 type="red" title="Pesanan" />
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
      <ListCard />
    </SnbContainer>
  );
};

// wrap provider history list context
export const OrderHistoryListView = copilot(copilotOptions(0, 'orderCoachmark'))(Provider(OrderHistoryList));;
