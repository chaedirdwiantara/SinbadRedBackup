import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { SnbButton } from '@sinbad/react-native-sinbad-ui';
import { CheckoutStyle } from '@screen/oms/styles';

interface PaymentMethodBottomProps {
  data: any;
}

export const PaymentMethodBottom: FC<PaymentMethodBottomProps> = () => {
  const pressButton = () => {
    // NEED SOMETHING
  };

  return (
    <View style={{ height: 75 }}>
      <SnbButton.Single
        type={'primary'}
        onPress={pressButton}
        title={'Buat Pesanan'}
        // loading={}
      />
      {/* add modal validation status */}
    </View>
  );
};
