import React, { FC } from 'react';
import { FooterButton } from '@sinbad/react-native-sinbad-ui';

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
    <FooterButton.Single
      title={'Buat Pesanan Sekarang'}
      buttonPress={onCreateOrder}
      disabled={choice == null && isSelected.length == 0 ? true : false}
    />
  );
};
