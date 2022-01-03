/** === IMPORT PACKAGES === */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbContainer, SnbTopNav, SnbStepper } from 'react-native-sinbad-ui';
import { RouteProp, useRoute } from '@react-navigation/native';
/** === IMPORT COMPONENTS === */
import { HistoryDetailCard, HistoryCardItem } from '../../components';
/** === IMPORT FUNCTIONS === */
import { toDateWithTime } from '@core/functions/global/date-format';
import { goBack } from '../../functions';
/** === IMPORT TYPE === */
import * as models from '@models';
/** === TYPES === */
export interface IHistoryDetailStatus {
  orderCode: string | null;
  createdAt: string;
  trackingId: string | null;
  cancelReason: string | null;
  logs: Array<models.ParcelLog>;
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
  /** === HOOK === */
  const { params } = useRoute<HistoryDetailStatusRouteProp>();
  /** === DERIVED === */
  const orderLogs = params.logs.map((log) => ({
    title: log?.detail ?? '-',
    subtitle: toDateWithTime(log.happenedAt),
  }));

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
