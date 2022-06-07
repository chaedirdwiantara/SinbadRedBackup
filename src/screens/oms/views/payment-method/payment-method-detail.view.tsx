import { View } from 'react-native';
import React, { FC } from 'react';
import { Text, SnbDivider2, SnbText2 } from '@sinbad/react-native-sinbad-ui';
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <SnbText2.Headline.Small>Total Pembayaran</SnbText2.Headline.Small>
        {dataChoose != null ? (
          <SnbText2.Headline.Small>
            {toCurrency(
              dataFromCheckout.totalPaymentNumber + dataChoose.serviceFeeDeduct,
              {
                withFraction: false,
              },
            )}
          </SnbText2.Headline.Small>
        ) : (
          <SnbText2.Headline.Small>
            {toCurrency(dataFromCheckout.totalPaymentNumber, {
              withFraction: false,
            })}
          </SnbText2.Headline.Small>
        )}
      </View>
    </View>
  );
};

export default PaymentMethodDetail;
