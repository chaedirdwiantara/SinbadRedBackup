import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { SnbButton } from '@sinbad/react-native-sinbad-ui';
import { CheckoutStyle } from '@screen/oms/styles';

interface PaymentMethodBottomProps {}

const PaymentMethodBottom: FC<PaymentMethodBottomProps> = () => {
  const pressButton = () => {
    // NEED SOMETHING
  };

  return (
    <View style={CheckoutStyle.bottomContainer}>
      <SnbButton.Dynamic
        size="small"
        type={'primary'}
        onPress={pressButton}
        title={'Buat Pesanan'}
        // loading={}
      />
      {/* add modal validation status */}
    </View>
  );
};

export default PaymentMethodBottom;
