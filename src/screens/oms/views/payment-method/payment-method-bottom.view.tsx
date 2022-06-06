import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { SnbButton, FooterButton } from '@sinbad/react-native-sinbad-ui';
import { CheckoutStyle, PaymentMethodStyle } from '@screen/oms/styles';
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
    <View style={PaymentMethodStyle.buttonFooter}>
      <FooterButton.Single
        title={'Buat Pesanan Sekarang'}
        buttonPress={onCreateOrder}
        disabled={choice == null && isSelected.length == 0 ? true : false}
      />
    </View>
  );
};
