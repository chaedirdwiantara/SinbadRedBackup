/** === IMPORT PACKAGE HERE ===  */
import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState, useContext } from 'react';
import { SnbContainer } from '@sinbad/react-native-sinbad-ui';
import { contexts } from '@contexts';
import { useFocusEffect } from '@react-navigation/native';
/** === IMPORT EXTERNAL COMPONENT === */
import { PaymentMethodHeader } from './payment-method-header.view';
import { PaymentMethodBottom } from './payment-method-bottom.view';
import { goToCheckout } from '@screen/oms/functions';
import { usePaymentMethodContext } from 'src/data/contexts/oms/payment-method/usePaymentMethodContext';
import { usePaymentMethodListContent } from '@screen/oms/functions/payment-method/payment-method-hook.function';

interface PaymentMethodInterface {
  props: {};
  route: any;
}

const OmsPaymentMethod: FC<PaymentMethodInterface> = (props) => {
  console.log(props.route.params, 'data');

  /** => Get payment method  */
  // const { statePaymentMethod } = useContext(contexts.PaymentMethodContext);
  const {
    statePaymentMethod: {
      paymentMethod: { data: paymentMethodData, loading: paymentMethodLoading },
    },
    dispatchPaymentMethod,
  } = usePaymentMethodContext();

  console.log(paymentMethodData, 'paymentMethodData');

  /** handle payment method */
  const payloadPaymentMethod = {
    skip: '0',
    limit: '10',
    keyword: 'transfer bank',
    sort: 'desc',
    sortBy: 'order',
    amount: 900,
  };
  const getPaymentMethodListContent = usePaymentMethodListContent();
  const handleOpenTNCModal = () => {
    getPaymentMethodListContent.paymentMethodListContentGet(
      dispatchPaymentMethod,
      payloadPaymentMethod,
    );
  };

  /** call payment method list */
  useFocusEffect(
    React.useCallback(() => {
      handleOpenTNCModal();
    }, []),
  );

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
          backgroundColor: 'white',
        }}>
        <Text>TES</Text>
      </View>

      {/* FOOTER */}
      <PaymentMethodBottom data={''} />
    </SnbContainer>
  );
};

export default OmsPaymentMethod;
