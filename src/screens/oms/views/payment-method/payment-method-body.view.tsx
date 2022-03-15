import { View, Text } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { method } from 'lodash';
import { PaymentMethodStyle } from '@screen/oms/styles';
import { SnbText } from '@sinbad/react-native-sinbad-ui';
import PaymentMethodListView from './payment-method-list.view';
import PaymentMethodDetail from './payment-method-detail.view';

interface PaymentMethodBodyProps {
  data: any;
  onSelectedType: any;
  dataFromCheckout: any;
}

const PaymentMethodBody: FC<PaymentMethodBodyProps> = ({
  data,
  onSelectedType,
  dataFromCheckout,
}) => {
  const [dataSelected, setDataSelected] = useState(''); //contain data

  const handleSelect = (selected: string) => {
    onSelectedType(selected); //index send to parent
  };

  const handleDataChoosen = (data: any) => {
    setDataSelected(data); //data send to child
    //data send to parent
  };

  return (
    <>
      <View style={PaymentMethodStyle.mainBodyContainer}>
        <SnbText.B2>Transfer Bank (Cek Otomatis)</SnbText.B2>
        <PaymentMethodListView
          payMethod={data[0]?.paymentMethods}
          onSelectMethod={handleSelect}
          dataChoosen={handleDataChoosen}
        />
      </View>
      <PaymentMethodDetail
        dataFromCheckout={dataFromCheckout}
        dataChoose={dataSelected}
      />
    </>
  );
};

export default PaymentMethodBody;
