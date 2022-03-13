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
  console.log(props, 'props');

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

  // console.log(paymentMethodData, 'paymentMethodData');

  // DUMMY
  const data = [
    {
      id: 1,
      code: 'bank_transfer_va',
      displayLabel: 'Transfer Bank (Cek Otomatis)',
      paymentMethods: [
        {
          code: 'BCA',
          displayLabel: 'BCA Virtual Account',
          iconURL:
            'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/bca.png',
          serviceFeeDeduct: 0,
          serviceFeeNonDeduct: 4400,
          isServiceFeeFree: true,
          isSelected: true,
        },
        {
          code: 'BNI',
          displayLabel: 'BNI Virtual Account',
          iconURL:
            'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/bni.png',
          serviceFeeDeduct: 0,
          serviceFeeNonDeduct: 4400,
          isServiceFeeFree: true,
          isSelected: true,
        },

        {
          code: 'BRI',
          displayLabel: 'BRI Virtual Account',
          iconURL:
            'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/bri.png',
          serviceFeeDeduct: 0,
          serviceFeeNonDeduct: 0,
          isServiceFeeFree: true,
          isSelected: false,
        },
        {
          code: 'Mandiri',
          displayLabel: 'Mandiri Virtual Account',
          iconURL:
            'https://sinbad-website-sg.s3-ap-southeast-1.amazonaws.com/dev/payment_method_icon/mandiri.png',
          serviceFeeDeduct: 0,
          serviceFeeNonDeduct: 0,
          isServiceFeeFree: true,
          isSelected: false,
        },
      ],
      createdAt: '2021-02-01T06:19:55.516Z',
      updatedAt: '2021-02-01T06:19:55.516Z',
    },
  ];

  /** => data from checkout */
  const dataCheckout = props.route.params.data;

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
