import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';

interface PaymentMethodInterface {
  dataToPaymentMethod: {};
}

const OmsPaymentMethod: FC<PaymentMethodInterface> = ({
  dataToPaymentMethod,
}) => {
  useEffect(() => {
    console.log(dataToPaymentMethod, 'dataToPaymentMethod');
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
      }}>
      <Text>TES</Text>
    </View>
  );
};

export default OmsPaymentMethod;
