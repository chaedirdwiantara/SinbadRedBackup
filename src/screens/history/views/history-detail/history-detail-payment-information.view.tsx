import React, { FC } from 'react';
import {
  HistoryDetailCard,
  HistoryDetailCardDivider,
  HistoryCardItem,
} from '@screen/history/components';
import { View } from 'react-native';
import { toCurrency } from '@core/functions/global/currency-format';
import {
  HistoryDetail,
  PaymentDetailSuccessProps,
  HistoryPromo,
  HistoryVoucher,
} from '@model/history';
import { PaymentType, OrderStatus } from '@screen/history/functions/data';
/** === INTERFACE === */
interface PaymentInformationProps {
  dataOrder: HistoryDetail | null;
  dataPayment: PaymentDetailSuccessProps | null;
}
/** === COMPONENT === */
const HistoryDetailPaymentInformation: FC<PaymentInformationProps> = ({
  dataPayment,
  dataOrder,
}) => {
  const paymentInformation = () => {
    if (
      dataPayment?.paymentType.id !== PaymentType.PAY_NOW &&
      (dataOrder?.deliveredParcelModified ||
        dataOrder?.status === OrderStatus.DONE ||
        dataOrder?.status === OrderStatus.DELIVERED)
    ) {
      return {
        qty: dataOrder.deliveredParcelQty,
        grossPrice: dataOrder.deliveredParcelGrossPrice,
        taxes: dataOrder.deliveredParcelTaxes,
        finalPrice: dataPayment?.deliveredTotalPayment,
        voucher: dataOrder.deliveredParcelVoucher,
        promo: dataOrder.deliveredParcelPromo,
        parcelFinal: dataOrder.deliveredParcelFinalPrice,
      };
    } else if (dataOrder?.invoicedParcelModified) {
      return {
        qty: dataOrder.invoicedParcelQty,
        grossPrice: dataOrder.invoicedParcelGrossPrice,
        taxes: dataOrder.invoicedParcelTaxes,
        finalPrice: dataOrder.invoicedParcelFinalPrice,
        // voucher: dataOrder.invoiced,
        promo: dataOrder.invoicedParcelPromo,
        parcelFinal: dataOrder.invoicedParcelFinalPrice,
      };
    } else {
      return {
        qty: dataOrder?.parcelQty,
        grossPrice: dataOrder?.parcelGrossPrice,
        taxes: dataOrder?.parcelTaxes,
        finalPrice: dataPayment?.totalPayment,
        parcelFinal: dataOrder?.parcelFinalPrice,
      };
    }
  };

  const renderVoucherList = (data?: HistoryVoucher[]) => {
    return dataOrder!.voucherList.length > 0 ? (
      data?.map((item: HistoryVoucher, index: number) => {
        return (
          <View key={index}>
            <HistoryCardItem
              title={item.catalogueName ?? ''}
              value={toCurrency(item.voucherValue!)}
              type="green"
            />
          </View>
        );
      })
    ) : (
      <View />
    );
  };

  const renderPromoList = (data?: HistoryPromo[]) => {
    return dataOrder!.promoList.length > 0 ? (
      data?.map((item: HistoryPromo, index: number) => {
        const qty =
          dataOrder?.status === OrderStatus.DELIVERED ||
          dataOrder?.status === OrderStatus.DONE
            ? item.deliveredPromoQty
            : item.promoQty;
        const qtyInTitle = qty ? ` (${qty} pcs)` : '';
        const title = `${item.catalogueName ?? ''}${qtyInTitle}`;

        return (
          <View key={index}>
            <HistoryCardItem
              title={title}
              value={item?.promoValue ? toCurrency(item?.promoValue) : 'FREE'}
              type="green"
            />
          </View>
        );
      })
    ) : (
      <View />
    );
  };

  return (
    <HistoryDetailCard title="Informasi Pembayaran">
      <HistoryCardItem
        title="Tipe Pembayaran"
        value={dataPayment?.paymentType.name || null}
      />
      <HistoryCardItem
        title="Metode Pembayaran"
        value={dataPayment?.paymentChannel.name || null}
      />
      <HistoryDetailCardDivider />
      <HistoryCardItem
        title={`Sub-total pesanan (${paymentInformation().qty})`}
        value={toCurrency(paymentInformation().grossPrice! ?? 0)}
      />
      {renderVoucherList(dataOrder?.voucherList)}
      {renderPromoList(dataOrder?.promoList)}
      <HistoryCardItem title="Ongkos Kirim" value={toCurrency(0)} />
      <HistoryCardItem
        title="PPN 10%"
        value={toCurrency(paymentInformation().taxes! ?? 0)}
      />
      <HistoryCardItem
        title="Total Pesanan"
        value={toCurrency(paymentInformation().parcelFinal! ?? 0)}
        type="bold"
      />
      <HistoryDetailCardDivider />
      {dataOrder?.parcelPromoPaymentAmount ? (
        <HistoryCardItem
          title="Promo Pembayaran"
          value={`- ${toCurrency(dataOrder?.parcelPromoPaymentAmount)}`}
        />
      ) : null}

      {dataPayment?.paymentFee ? (
        <HistoryCardItem
          title="Layanan Pembayaran"
          value={toCurrency(dataPayment?.paymentFee ?? 0)}
        />
      ) : null}
      <HistoryCardItem
        title="Total Pembayaran Pesanan"
        value={toCurrency(paymentInformation().finalPrice! ?? 0)}
        type="bold"
      />
    </HistoryDetailCard>
  );
};

export default HistoryDetailPaymentInformation;
