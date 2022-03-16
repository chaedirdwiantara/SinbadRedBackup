import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { SnbButton } from '@sinbad/react-native-sinbad-ui';
import { CheckoutStyle } from '@screen/oms/styles';
import { findIsSelected } from '@screen/oms/functions/payment-method/payment-method.function';

interface PaymentMethodBottomProps {
  data: any;
  choice: any;
  onCreateOrder: () => void;
}

export const PaymentMethodBottom: FC<PaymentMethodBottomProps> = ({
  choice,
  onCreateOrder,
  data,
}) => {
  const dataPaymentMethod = data[0]?.paymentMethods;
  const isSelected = findIsSelected(dataPaymentMethod);
  console.log(isSelected, 'isSelected');
  console.log(choice, 'choice');

  return (
    <View style={{ height: 75 }}>
      <SnbButton.Single
        type={'primary'}
        onPress={onCreateOrder}
        title={'Buat Pesanan'}
        disabled={choice != null && isSelected != [] ? false : true}
      />
      {/* add modal validation status */}
    </View>
  );
};
