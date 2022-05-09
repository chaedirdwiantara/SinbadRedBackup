import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { SnbButton } from '@sinbad/react-native-sinbad-ui';
import { CheckoutStyle } from '@screen/oms/styles';
import { findIsSelected } from '@screen/oms/functions/payment-method/payment-method.function';

interface PaymentMethodBottomProps {
  choice: any;
  isSelected: any;
  onCreateOrder: () => void;
}

export const PaymentMethodBottom: FC<PaymentMethodBottomProps> = ({
  choice,
  onCreateOrder,
  isSelected,
}) => {
  return (
    <View style={{ height: 75 }}>
      <SnbButton.Single
        type={'primary'}
        onPress={onCreateOrder}
        title={'Buat Pesanan'}
        disabled={choice == null && isSelected.length == 0 ? true : false}
      />
      {/* add modal validation status */}
    </View>
  );
};