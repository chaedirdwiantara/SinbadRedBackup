/** === IMPORT PACKAGE HERE ===  */
import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { SnbContainer } from '@sinbad/react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT === */
import { PaymentMethodHeader } from './payment-method-header.view';
import { PaymentMethodBottom } from './payment-method-bottom.view';
import { goToCheckout } from '@screen/oms/functions';

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
    <SnbContainer color="grey">
      {/* HEADER */}
      <PaymentMethodHeader
        backAction={() => {
          goToCheckout();
        }}
      />

      {/* BODY */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}>
        <Text>TES</Text>
      </View>

      {/* FOOTER */}
      <PaymentMethodBottom />
    </SnbContainer>
  );
};

export default OmsPaymentMethod;
