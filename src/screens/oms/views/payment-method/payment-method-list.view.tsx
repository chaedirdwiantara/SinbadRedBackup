import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {
  color,
  SnbListButtonType1,
  SnbText,
} from '@sinbad/react-native-sinbad-ui';
import { PaymentMethodStyle } from '@screen/oms/styles';
import * as models from '@models';
interface PaymentMethodListProps {
  payMethod: models.PaymentMethod[];
  onSelectMethod: (selected: string) => void;
  dataChoosen: (data: any) => void;
}

const PaymentMethodListView: FC<PaymentMethodListProps> = ({
  payMethod,
  onSelectMethod,
  dataChoosen,
}) => {
  const [selectMethod, setSelectMethod] = useState(-1); //handle selected method
  const [pressed, setPressed] = useState(false); //handle isAlready selected

  const handleOnpress = (data: number, item: models.PaymentMethod) => {
    onSelectMethod(data.toString());
    dataChoosen(item);
    setSelectMethod(data);
    setPressed(true);
  };

  return (
    <FlatList
      keyExtractor={(_, index) => index.toString()}
      data={payMethod}
      renderItem={({ item, index }) =>
        pressed === false && item.isSelected === true ? (
          <TouchableOpacity
            style={[
              PaymentMethodStyle.listContainer,
              { borderColor: color.black100 },
            ]}
            onPress={() => {
              handleOnpress(index, item);
            }}>
            <Image
              source={{ uri: item.iconUrl }}
              style={PaymentMethodStyle.listImage}
            />
            <View style={PaymentMethodStyle.listName}>
              <SnbText.B2 color={color.black100}>
                {item.displayLabel}
              </SnbText.B2>
            </View>
          </TouchableOpacity>
        ) : (
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
              source={{ uri: item.iconUrl }}
              style={PaymentMethodStyle.listImage}
            />
            <View style={PaymentMethodStyle.listName}>
              <SnbText.B2 color={color.black100}>
                {item.displayLabel}
              </SnbText.B2>
            </View>
          </TouchableOpacity>
        )
      }
    />
  );
};

export default PaymentMethodListView;
