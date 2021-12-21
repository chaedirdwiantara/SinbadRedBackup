/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbStepper } from 'react-native-sinbad-ui';
import { RouteProp, useRoute } from '@react-navigation/native';
/** === IMPORT COMPONENTS === */
import { HistoryDetailCard, HistoryCardItem } from '../../components';
/** === IMPORT FUNCTIONS === */
import { toDateWithTime } from '@core/functions/global/date-format';
import { useHistoryContext } from 'src/data/contexts/history/useHistoryContext';
import { goBack } from '../../functions';
/** === IMPORT TYPES === */
import { StatusLog } from '../../types';
/** === TYPES === */
export interface IHistoryDetailStatus {
  orderCode: string | null;
  createdAt: string;
  trackingId: string | null;
  cancelReason: string | null;
  logs: Array<StatusLog>;
}

type HistoryDetailStatusParam = {
  Status: IHistoryDetailStatus;
};

type HistoryDetailStatusRouteProp = RouteProp<
  HistoryDetailStatusParam,
  'Status'
>;
/** === COMPONENT === */
const HistoryDetailStatusView: FC = () => {
  /** === HOOKS === */
  const { params } = useRoute<HistoryDetailStatusRouteProp>();
  const {
    stateHistory: { paymentStatus, orderStatus },
  } = useHistoryContext();
  /** === DERIVEDS === */
  const statusData = [...orderStatus.data, ...paymentStatus.data];
  const orderLogs = params.logs.map((log) => {
    const data = statusData.find((status) => status.status === log.status);
    return {
      title: data?.detail ?? '-',
      subtitle: toDateWithTime(log.createdAt),
    };
  });

  return (
    <SnbContainer color="white">
      <SnbTopNav.Type3 backAction={goBack} title="Detail Status" type="red" />
      <View>
        <HistoryDetailCard title="Tracking Pesanan">
          <HistoryCardItem
            title="Nomor Pesanan"
            value={params.orderCode}
            type="bold"
          />
          <HistoryCardItem
            title="Tanggal Pembelian"
            value={toDateWithTime(params.createdAt)}
            type="bold"
          />
          <HistoryCardItem
            title="Nomor Resi"
            value={params.trackingId}
            type="bold"
          />
          {params.cancelReason && (
            <HistoryCardItem
              title="Alasan Pembatalan"
              value={params.cancelReason}
              type="bold"
            />
          )}
        </HistoryDetailCard>
        <HistoryDetailCard title="Detail" gutter={false} contentTopSpaces={10}>
          <SnbStepper.Vertical data={orderLogs} activeStep={1} />
        </HistoryDetailCard>
      </View>
    </SnbContainer>
  );
};

export default HistoryDetailStatusView;
