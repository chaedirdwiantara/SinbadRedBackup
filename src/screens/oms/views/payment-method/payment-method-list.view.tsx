import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {
  color,
  SnbListButtonType1,
  SnbText,
} from '@sinbad/react-native-sinbad-ui';
import { PaymentMethodStyle } from '@screen/oms/styles';

interface PaymentMethodListProps {
  payMethod: any;
  onSelectMethod: any;
  dataChoosen: any;
}

const PaymentMethodListView: FC<PaymentMethodListProps> = ({
  payMethod,
  onSelectMethod,
  dataChoosen,
}) => {
  const [selectMethod, setSelectMethod] = useState(-1); //handle selected method

  const handleOnpress = (data: number, item: any) => {
    onSelectMethod(data.toString());
    dataChoosen(item);
    setSelectMethod(data);
  };

  return (
    <FlatList
      keyExtractor={(_, index) => index.toString()}
      data={payMethod}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={[
            PaymentMethodStyle.listContainer,
            selectMethod == index
              ? { borderColor: color.black100 }
              : { borderColor: color.black40 },
          ]}
          onPress={() => {
            handleOnpress(index, item);
          }}>
          <Image
            source={{ uri: item.iconURL }}
            style={PaymentMethodStyle.listImage}
          />
          <View style={PaymentMethodStyle.listName}>
            <SnbText.B2 color={color.black100}>{item.displayLabel}</SnbText.B2>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default PaymentMethodListView;
