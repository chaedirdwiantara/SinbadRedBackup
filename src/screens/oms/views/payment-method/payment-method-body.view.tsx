import { View, ScrollView } from 'react-native';
import React, { FC, useState } from 'react';
import { PaymentMethodStyle } from '@screen/oms/styles';
import { SnbText, Payment } from '@sinbad/react-native-sinbad-ui';
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
      <View style={{ flex: 1 }}>
        <ScrollView>
          {data?.map((i) => (
            <View style={PaymentMethodStyle.mainBodyContainer}>
              <SnbText.B2>{i?.displayLabel}</SnbText.B2>

              <Payment.PaymentOption
                payMethod={i?.paymentMethods}
                onSelectMethod={handleSelect}
                dataChoosen={handleDataChoosen}
                dataSelected={dataSelected?.displayLabel || ''}
                testID="paymentOption.payment"
                disabledDesc="Tidak tersedia untuk transaksi ini"
              />
            </View>
          ))}

          <PaymentMethodDetail
            dataFromCheckout={dataFromCheckout}
            dataChoose={dataSelected}
            isSelected={isSelected}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default PaymentMethodBody;
