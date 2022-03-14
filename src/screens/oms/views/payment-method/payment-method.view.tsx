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
import PaymentMethodBody from './payment-method-body.view';

interface PaymentMethodInterface {
  props: {};
  route: any;
}

const OmsPaymentMethod: FC<PaymentMethodInterface> = (props) => {
  // console.log(props, 'props');

  /** => Hooks */
  const [selectMethod, setSelectMethod] = useState(''); //handle selected method

  /** => Get payment method  */
  // const { statePaymentMethod } = useContext(contexts.PaymentMethodContext);
  const {
    statePaymentMethod: {
      paymentMethod: { data: paymentMethodData, loading: paymentMethodLoading },
    },
    dispatchPaymentMethod,
  } = usePaymentMethodContext();

  const data = paymentMethodData;

  /** => data from checkout */
  const dataCheckout = props.route.params.data;

  /** handle payment method */
  const payloadPaymentMethod = {
    amount: 900,
    keyword: '',
    sort: 'desc',
    sortBy: '',
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

  /** handle selected method */
  const handleSelect = (selected: string) => {
    setSelectMethod(selected);
  };

  return (
    <SnbContainer color="grey">
      {/* HEADER */}
      <PaymentMethodHeader
        backAction={() => {
          goToCheckout();
        }}
      />

      {/* BODY */}
      <PaymentMethodBody
        data={data}
        onSelectedType={handleSelect}
        dataFromCheckout={dataCheckout}
      />

      {/* FOOTER */}
      <PaymentMethodBottom data={''} choice={selectMethod} />
    </SnbContainer>
  );
};

export default OmsPaymentMethod;
