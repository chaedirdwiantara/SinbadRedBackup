import { View, Text } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { method } from 'lodash';
import { PaymentMethodStyle } from '@screen/oms/styles';
import { SnbText } from '@sinbad/react-native-sinbad-ui';
import PaymentMethodListView from './payment-method-list.view';
import PaymentMethodDetail from './payment-method-detail.view';
import * as models from '@models';
interface PaymentMethodBodyProps {
  data: models.PaymentMethodList[];
  onSelectedType: (selected: string) => void;
  onDataChoosen: (data: models.PaymentMethod) => void;
  dataFromCheckout: any;
  isSelected: models.PaymentMethod | any;
}

const PaymentMethodBody: FC<PaymentMethodBodyProps> = ({
  data,
  onSelectedType,
  onDataChoosen,
  dataFromCheckout,
  isSelected,
}) => {
  const [dataSelected, setDataSelected] = useState<models.PaymentMethod | null>(
    null,
  ); //contain data

  const handleSelect = (selected: string) => {
    onSelectedType(selected); //index send to parent
  };

  const handleDataChoosen = (data: models.PaymentMethod) => {
    setDataSelected(data); //data send to child
    //data send to parent
    onDataChoosen(data);
  };

  return (
    <>
      {data?.map((i) => (
        <View style={PaymentMethodStyle.mainBodyContainer}>
          <SnbText.B2>{i?.displayLabel}</SnbText.B2>
          <PaymentMethodListView
            payMethod={i?.paymentMethods}
            onSelectMethod={handleSelect}
            dataChoosen={handleDataChoosen}
            dataSelected={dataSelected?.displayLabel || ''}
          />
        </View>
      ))}

      <PaymentMethodDetail
        dataFromCheckout={dataFromCheckout}
        dataChoose={dataSelected}
        isSelected={isSelected}
      />
    </>
  );
};

export default PaymentMethodBody;
