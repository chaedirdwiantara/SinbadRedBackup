import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { Text, SnbDivider2 } from '@sinbad/react-native-sinbad-ui';
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
      <Text.DetailPrice
        type="item"
        label={`Total Produk (${dataFromCheckout.totalQtyCheckout})`}
        value={toCurrency(dataFromCheckout.totalPaymentNumber, {
          withFraction: false,
        })}
      />
      <Text.DetailPrice
        type="item"
        label="Biaya Layanan"
        value={
          dataChoose != null
            ? toCurrency(dataChoose.serviceFeeDeduct, {
                withFraction: false,
              })
            : isSelected != [] && isSelected[0] && dataChoose == null
            ? toCurrency(isSelected[0].serviceFeeDeduct, {
                withFraction: false,
              })
            : 'Rp -'
        }
      />
      <View style={{ marginVertical: 8 }}>
        <SnbDivider2 type="solid" />
      </View>
      <Text.DetailPrice
        type="total"
        bold={true}
        value={
          dataChoose != null
            ? toCurrency(dataFromCheckout.totalPaymentNumber, {
                withFraction: false,
              })
            : toCurrency(
                dataFromCheckout.totalPaymentNumber,

                {
                  withFraction: false,
                },
              )
        }
      />
    </View>
  );
};

export default PaymentMethodDetail;
