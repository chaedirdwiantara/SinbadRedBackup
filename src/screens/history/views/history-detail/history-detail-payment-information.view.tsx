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
  dataPayment: PaymentDetailSuccessProps;
}
/** === COMPONENT === */
const HistoryDetailPaymentInformation: FC<PaymentInformationProps> = ({
  renderCardItem,
  dataOrder,
  dataPayment,
}) => {
  console.log(dataPayment, 'DATA PAYMENT DI INFO');

  return (
    <>
      <HistoryDetailCard title="Informasi Pembayaran">
        {HistoryCardItem('Tipe Pembayaran', dataPayment?.paymentType.name)}
        {HistoryCardItem('Metode Pembayaran', dataPayment?.paymentChannel.name)}
        {HistoryCardItem('Sub-total pesanan (90)', toCurrency(1000000))}
        {
          // historyDetailDummy.payment.freeProducts.map((product) =>
          HistoryCardItem(`${'tes'} (${20} ${4000})`, 'FREE', 'green')
        }
        {HistoryCardItem('Ongkos Kirim', toCurrency(0))}
        {HistoryCardItem('PPN 10%', toCurrency(100000))}
        {HistoryCardItem('Total Pesanan', toCurrency(1100000), 'bold')}
        <HistoryDetailCardDivider />
        {HistoryCardItem('Promo Pembayaran', toCurrency(10000))}
        {dataPayment?.paymentFee
          ? HistoryCardItem(
              'Layanan Pembayaran',
              toCurrency(dataPayment?.paymentFee || 0),
            )
          : null}
        {HistoryCardItem(
          'Total Pembayaran Pesanan',
          toCurrency(1233000),
          'bold',
        )}
      </HistoryDetailCard>
    </>
  );
};

export default HistoryDetailPaymentInformation;
