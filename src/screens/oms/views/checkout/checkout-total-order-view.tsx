import { toCurrency } from '@core/functions/global/currency-format';
import { CheckoutStyle } from '@screen/oms/styles';
import {
  SnbText2,
  colorV2,
  SnbDivider,
  spacingV2,
} from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import { View } from 'react-native';
interface CheckoutTotalOrderViewProps {
  totalProductsQty: number;
  totalProductsValue: number;
  discountVoucher: number;
  totalDeliveryFee: number;
  serviceFee: number;
  totalPayment: number;
  testID: string;
}
/** === COMPONENT === */
export const CheckoutTotalOrderView: FC<CheckoutTotalOrderViewProps> = ({
  totalProductsQty,
  totalProductsValue,
  discountVoucher,
  totalDeliveryFee,
  serviceFee,
  totalPayment,
  testID,
}) => {
  return (
    <View style={CheckoutStyle.totalOrderContainer}>
      <View style={CheckoutStyle.totalOrderTextContainer}>
        <SnbText2.Paragraph.Default
          testID={`totalProductsQty.totalOrder.${testID}`}
          color={
            colorV2.textColor.secondary
          }>{`Total Barang (${totalProductsQty})`}</SnbText2.Paragraph.Default>
        <SnbText2.Paragraph.Default
          testID={`totalProductsValue.totalOrder.${testID}`}
          color={colorV2.textColor.secondary}>
          {toCurrency(totalProductsValue, { withFraction: false })}
        </SnbText2.Paragraph.Default>
      </View>
      <View style={CheckoutStyle.totalOrderTextContainer}>
        <SnbText2.Paragraph.Default
          testID={`voucherDiscountLabel.totalOrder.${testID}`}
          color={colorV2.textColor.secondary}>
          {'Potongan Voucher'}
        </SnbText2.Paragraph.Default>
        <SnbText2.Paragraph.Default
          testID={`voucherDiscountValue.totalOrder.${testID}`}
          color={colorV2.textColor.success}>
          {`-${toCurrency(discountVoucher, { withFraction: false })}`}
        </SnbText2.Paragraph.Default>
      </View>
      <View style={CheckoutStyle.totalOrderTextContainer}>
        <SnbText2.Paragraph.Default
          testID={`totalDeliveryLabel.totalOrder.${testID}`}
          color={colorV2.textColor.secondary}>
          {'Total Ongkos Kirim'}
        </SnbText2.Paragraph.Default>
        <SnbText2.Paragraph.Default
          testID={`totalDeliveryValue.totalOrder.${testID}`}
          color={colorV2.textColor.secondary}>
          {toCurrency(totalDeliveryFee, { withFraction: false })}
        </SnbText2.Paragraph.Default>
      </View>
      <View style={CheckoutStyle.totalOrderTextContainerNoMargin}>
        <SnbText2.Paragraph.Default
          testID={`serviceFeeLabel.totalOrder.${testID}`}
          color={colorV2.textColor.secondary}>
          {'Biaya Layanan'}
        </SnbText2.Paragraph.Default>
        <SnbText2.Paragraph.Default
          testID={`serviceFeeValue.totalOrder.${testID}`}
          color={colorV2.textColor.secondary}>
          {toCurrency(serviceFee, { withFraction: false })}
        </SnbText2.Paragraph.Default>
      </View>
      <View style={{ marginVertical: spacingV2.spacing.sm }}>
        <SnbDivider />
      </View>
      <View style={CheckoutStyle.totalOrderTextContainerNoMargin}>
        <SnbText2.Headline.Small
          testID={`totalPaymentLabel.totalOrder.${testID}`}>
          {'Total Pembayaran'}
        </SnbText2.Headline.Small>
        <SnbText2.Headline.Small
          testID={`totalPaymentValue.totalOrder.${testID}`}>
          {toCurrency(totalPayment, { withFraction: false })}
        </SnbText2.Headline.Small>
      </View>
    </View>
  );
};
