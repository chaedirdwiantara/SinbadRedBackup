import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { SnbButton } from '@sinbad/react-native-sinbad-ui';
import { CheckoutStyle } from '@screen/oms/styles';

interface PaymentMethodBottomProps {
  data: any;
  choice: any;
  paymentStatusModal: () => void;
}

export const PaymentMethodBottom: FC<PaymentMethodBottomProps> = ({
  choice,
  paymentStatusModal,
}) => {
  const pressButton = () => {
    // NEED SOMETHING
  };

  return (
    <View style={{ height: 75 }}>
      <SnbButton.Single
        type={'primary'}
        onPress={paymentStatusModal}
        title={'Buat Pesanan'}
        disabled={choice != '' ? false : true}
        // loading={}
      />
      {/* add modal validation status */}
    </View>
  );
};
