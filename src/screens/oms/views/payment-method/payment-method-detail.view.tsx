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
import * as models from '@models';

interface PaymentMethodDetailProps {
  dataFromCheckout: any;
  dataChoose: any;
  isSelected: models.PaymentMethod | any;
}

const PaymentMethodDetail: FC<PaymentMethodDetailProps> = ({
  dataFromCheckout,
  dataChoose,
  isSelected,
}) => {
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
        {dataChoose != null ? (
          <SnbText.B2
            color={
              dataChoose.serviceFeeDeduct == 0 ? color.green80 : color.black80
            }>
            {toCurrency(dataChoose.serviceFeeDeduct, {
              withFraction: false,
            })}
          </SnbText.B2>
        ) : isSelected != [] && isSelected[0] && dataChoose == null ? (
          <SnbText.B2
            color={
              isSelected[0]?.serviceFeeDeduct == 0
                ? color.green80
                : color.black80
            }>
            {toCurrency(isSelected[0].serviceFeeDeduct, {
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
        {dataChoose != null ? (
          <SnbText.B2 color={color.black100}>
            {toCurrency(
              dataFromCheckout.totalPaymentNumber + dataChoose.serviceFeeDeduct,
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
