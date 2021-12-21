import React, { FC } from 'react';
import {
  HistoryDetailCard,
  HistoryDetailCardDivider,
  HistoryCardItem,
} from '@screen/history/components';
import { toCurrency } from '@core/functions/global/currency-format';
import { PaymentDetailSuccessProps } from '@model/history';
/** === INTERFACE === */
interface PaymentInformationProps {
  renderCardItem: () => void;
  dataOrder: {};
  dataPayment: PaymentDetailSuccessProps | null;
}
/** === COMPONENT === */
const HistoryDetailPaymentInformation: FC<PaymentInformationProps> = ({
  dataPayment,
}) => {
  return (
    <HistoryDetailCard title="Informasi Pembayaran">
      <HistoryCardItem
        title="Tipe Pembayaran"
        value={dataPayment?.paymentType.name}
      />
      <HistoryCardItem
        title="Metode Pembayaran"
        value={dataPayment?.paymentChannel.name}
      />
      <HistoryCardItem
        title="Sub-total pesanan (90)"
        value={toCurrency(1000000)}
      />
      <HistoryCardItem title="tes 20 400" value="FREE" type="green" />
      <HistoryCardItem title="Ongkos Kirim" value={toCurrency(0)} />
      <HistoryCardItem title="PPN 10%" value={toCurrency(100000)} />
      <HistoryCardItem
        title="Total Pesanan"
        value={toCurrency(1100000)}
        type="bold"
      />
      <HistoryDetailCardDivider />
      <HistoryCardItem title="Promo Pembayaran" value={toCurrency(10000)} />
      {dataPayment?.paymentFee ? (
        <HistoryCardItem
          title="Layanan Pembayaran"
          value={toCurrency(dataPayment?.paymentFee ?? 0)}
        />
      ) : null}
      <HistoryCardItem
        title="Total Pembayaran Pesanan"
        value={toCurrency(1233000)}
        type="bold"
      />
    </HistoryDetailCard>
  );
};

export default HistoryDetailPaymentInformation;
