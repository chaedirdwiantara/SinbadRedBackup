import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import { SnbContainer, SnbTopNav } from '@sinbad/react-native-sinbad-ui';
import { NavigationAction } from '@core/functions/navigation';
import {
  OrderTrack,
  OrderHistory,
} from '../../components/order-history-tracking';

const HistoryTracking = () => {
  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3
        type="red"
        title="Detail Status"
        backAction={NavigationAction.back}
      />
      <ScrollView>
        <OrderTrack />
        <OrderHistory />
      </ScrollView>
    </SnbContainer>
  );
};

export const HistoryTrackingView = memo(HistoryTracking);
