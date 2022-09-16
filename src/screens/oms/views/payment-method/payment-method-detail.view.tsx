import React, { FC } from 'react';
import { View } from 'react-native';
import { Payment } from '@sinbad/react-native-sinbad-ui';
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
    <View>
      <Payment.PaymentSummary
        firstTitle={`Total Barang (${dataFromCheckout.totalQtyCheckout})`}
        firstValue={toCurrency(dataFromCheckout.totalPaymentNumber, {
          withFraction: false,
        })}
        voucher={data?.sinbadVoucherDiscountOrder != 0 ? true : false}
        secondTitle={'Potongan Voucher'}
        secondValue={`-${toCurrency(data?.sinbadVoucherDiscountOrder, {
          withFraction: false,
        })}`}
        thirdTitle={'Total Ongkos Kirim'}
        thirdValue={toCurrency(0, {
          withFraction: false,
        })}
        fourthTitle={'Biaya Layanan'}
        fourthValue={
          dataChoose != null
            ? toCurrency(dataChoose.serviceFeeDeduct, {
                withFraction: false,
              })
            : isSelected != [] && isSelected[0] && dataChoose == null
            ? toCurrency(isSelected[0]?.serviceFeeDeduct, {
                withFraction: false,
              })
            : 'Rp -'
        }
        totalTitle={'Total Pembayaran'}
        totalValue={
          dataChoose != null
            ? toCurrency(
                dataFromCheckout.totalPaymentNumber +
                  dataChoose.serviceFeeDeduct -
                  sinbadVoucherDiscountOrder,
                {
                  withFraction: false,
                },
              )
            : isSelected != [] && isSelected[0] && dataChoose == null
            ? toCurrency(
                dataFromCheckout.totalPaymentNumber +
                  isSelected[0]?.serviceFeeDeduct -
                  sinbadVoucherDiscountOrder,
                {
                  withFraction: false,
                },
              )
            : toCurrency(
                dataFromCheckout.totalPaymentNumber -
                  sinbadVoucherDiscountOrder,
                {
                  withFraction: false,
                },
              )
        }
        testID="paymentSummary.payment"
      />
    </View>
  );
};

export default PaymentMethodDetail;
