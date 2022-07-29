import { View } from 'react-native';
import React, { FC } from 'react';
import {
  Text,
  SnbDivider2,
  SnbText2,
  colorV2,
} from '@sinbad/react-native-sinbad-ui';
import { PaymentMethodStyle } from '@screen/oms/styles';
import { toCurrency } from '@core/functions/global/currency-format';
import * as models from '@models';
import { useCheckoutContext } from 'src/data/contexts/oms/checkout/useCheckoutContext';

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
  const {
    stateCheckout: {
      checkout: { data },
    },
  } = useCheckoutContext();

  const sinbadVoucherDiscountOrder =
    data?.sinbadVoucherDiscountOrder != null
      ? data.sinbadVoucherDiscountOrder
      : 0;

  return (
    <View style={PaymentMethodStyle.detailContainer}>
      <Text.DetailPrice
        type="item"
        label={`Total Barang (${dataFromCheckout.totalQtyCheckout})`}
        value={toCurrency(dataFromCheckout.totalPaymentNumber, {
          withFraction: false,
        })}
      />
      {data?.sinbadVoucherDiscountOrder != 0 ? (
        <Text.DetailPrice
          type="item"
          label={`Potongan Voucher`}
          value={`-${toCurrency(data?.sinbadVoucherDiscountOrder, {
            withFraction: false,
          })}`}
          colorLabel={colorV2.textColor.secondary}
          colorValue={colorV2.textColor.success}
        />
      ) : null}
      <Text.DetailPrice
        type="item"
        label={`Total Ongkos Kirim`}
        value={toCurrency(0, {
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
              dataFromCheckout.totalPaymentNumber +
                dataChoose.serviceFeeDeduct -
                sinbadVoucherDiscountOrder,
              {
                withFraction: false,
              },
            )}
          </SnbText2.Headline.Small>
        ) : (
          <SnbText2.Headline.Small>
            {toCurrency(
              dataFromCheckout.totalPaymentNumber - sinbadVoucherDiscountOrder,
              {
                withFraction: false,
              },
            )}
          </SnbText2.Headline.Small>
        )}
      </View>
    </View>
  );
};

export default PaymentMethodDetail;
