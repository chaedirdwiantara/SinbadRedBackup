import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {
  color,
  SnbDivider,
  SnbListButtonType1,
  SnbText,
} from '@sinbad/react-native-sinbad-ui';
import { PaymentMethodStyle } from '@screen/oms/styles';
import { toCurrency } from '@core/functions/global/currency-format';

interface PaymentMethodDetailProps {
  dataFromCheckout: any;
  choice: string;
  dataChoose: any;
}

const PaymentMethodDetail: FC<PaymentMethodDetailProps> = ({
  dataFromCheckout,
  choice,
  dataChoose,
}) => {
  console.log(choice, 'choice');
  console.log(dataChoose, 'dataChoose');
  return (
    <View style={PaymentMethodStyle.detailContainer}>
      <View style={PaymentMethodStyle.detailRow}>
        <SnbText.B2 color={color.black80}>
          Total Produk {`(${dataFromCheckout.totalQtyCheckout})`}
        </SnbText.B2>
        <SnbText.B2 color={color.black80}>
          {toCurrency(dataFromCheckout.totalPaymentNumber, {
            withFraction: false,
          })}
        </SnbText.B2>
      </View>
      <View style={PaymentMethodStyle.detailRow}>
        <SnbText.B2 color={color.black80}>Biaya Layanan</SnbText.B2>
        {dataChoose != '' ? (
          <SnbText.B2
            color={
              dataChoose.serviceFeeNonDeduct == 0
                ? color.green80
                : color.black80
            }>
            {toCurrency(dataChoose.serviceFeeNonDeduct, {
              withFraction: false,
            })}
          </SnbText.B2>
        ) : (
          <SnbText.B2 color={color.black80}>Rp-</SnbText.B2>
        )}
      </View>
      <SnbDivider style={{ marginVertical: 1 }} />
      <View style={PaymentMethodStyle.detailRow}>
        <SnbText.B2 color={color.black100}>Total Pembayaran</SnbText.B2>
        {dataChoose != '' ? (
          <SnbText.B2 color={color.black100}>
            {toCurrency(
              dataFromCheckout.totalPaymentNumber +
                dataChoose.serviceFeeNonDeduct,
              {
                withFraction: false,
              },
            )}
          </SnbText.B2>
        ) : (
          <SnbText.B2 color={color.black100}>
            {toCurrency(
              dataFromCheckout.totalPaymentNumber,

              {
                withFraction: false,
              },
            )}
          </SnbText.B2>
        )}
      </View>
    </View>
  );
};

export default PaymentMethodDetail;
