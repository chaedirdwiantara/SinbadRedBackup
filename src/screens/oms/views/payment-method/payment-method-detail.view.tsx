import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {
  color,
  SnbDivider,
  SnbListButtonType1,
  SnbText,
} from '@sinbad/react-native-sinbad-ui';
import { PaymentMethodStyle } from '@screen/oms/styles';

interface PaymentMethodDetailProps {
  data: any;
  servicePayment: number;
  choice: string;
}

const PaymentMethodDetail: FC<PaymentMethodDetailProps> = ({
  data,
  servicePayment,
  choice,
}) => {
  return (
    <View style={PaymentMethodStyle.detailContainer}>
      <View style={PaymentMethodStyle.detailRow}>
        <SnbText.B2 color={color.black80}>Total Produk (2)</SnbText.B2>
        <SnbText.B2 color={color.black80}>Rp200.000</SnbText.B2>
      </View>
      <View style={PaymentMethodStyle.detailRow}>
        <SnbText.B2 color={color.black80}>Biaya Layanan</SnbText.B2>
        <SnbText.B2 color={color.black80}>Rp-</SnbText.B2>
      </View>
      <SnbDivider style={{ marginVertical: 1 }} />
      <View style={PaymentMethodStyle.detailRow}>
        <SnbText.B2 color={color.black100}>Total Pembayaran</SnbText.B2>
        <SnbText.B2 color={color.black100}>Rp200.000</SnbText.B2>
      </View>
    </View>
  );
};

export default PaymentMethodDetail;
