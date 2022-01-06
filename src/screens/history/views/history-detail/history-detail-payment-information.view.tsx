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
  HistoryVoucher,
  HistoryPromoApplied,
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
              title={item.voucherName ?? ''}
              value={`- ${toCurrency(item.voucherValue!, {
                withFraction: false,
              })}`}
              type="green"
            />
          </View>
        );
      })
    ) : (
      <View />
    );
  };

  const renderPromoList = (data?: HistoryPromoApplied[]) => {
    return dataOrder!.promoApplied.length > 0 ? (
      data?.map((item: HistoryPromoApplied, index: number) => (
        <View key={index}>
          <HistoryCardItem
            title={item.promoName}
            value={
              item?.promoValue
                ? `- ${toCurrency(item?.promoValue, { withFraction: false })}`
                : 'FREE'
            }
            type="green"
          />
        </View>
      ))
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
        value={toCurrency(paymentInformation().grossPrice! ?? 0, {
          withFraction: false,
        })}
      />
      {renderVoucherList(dataOrder?.voucherList)}
      {renderPromoList(dataOrder?.promoApplied)}
      <HistoryCardItem
        title="Ongkos Kirim"
        value={toCurrency(0, { withFraction: false })}
      />
      <HistoryCardItem
        title="PPN 10%"
        value={toCurrency(paymentInformation().taxes! ?? 0, {
          withFraction: false,
        })}
      />
      <HistoryCardItem
        title="Total Pesanan"
        value={toCurrency(paymentInformation().parcelFinal! ?? 0, {
          withFraction: false,
        })}
        type="bold"
      />
      <HistoryDetailCardDivider />
      {dataOrder?.parcelPromoPaymentValue ? (
        <HistoryCardItem
          title="Promo Pembayaran"
          value={`- ${toCurrency(dataOrder?.parcelPromoPaymentValue, {
            withFraction: false,
          })}`}
        />
      ) : null}

      {dataPayment?.paymentFee ? (
        <HistoryCardItem
          title="Layanan Pembayaran"
          value={toCurrency(dataPayment?.paymentFee ?? 0, {
            withFraction: false,
          })}
        />
      ) : null}
      <HistoryCardItem
        title="Total Pembayaran Pesanan"
        value={toCurrency(paymentInformation().finalPrice! ?? 0, {
          withFraction: false,
        })}
        type="bold"
      />
    </HistoryDetailCard>
  );
};

export default HistoryDetailPaymentInformation;
