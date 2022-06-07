import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import { SnbText2, colorV2 } from '@sinbad/react-native-sinbad-ui';
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
              {
                borderColor: colorV2.strokeColor.primary,
                backgroundColor: colorV2.bgColor.red,
              },
            ]}
            onPress={() => {
              handleOnpress(index, item);
            }}>
            <Image
              source={{ uri: item.iconUrl }}
              style={PaymentMethodStyle.listImage}
            />
            <View style={PaymentMethodStyle.listName}>
              <SnbText2.Headline.Default>
                {item.displayLabel}
              </SnbText2.Headline.Default>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              PaymentMethodStyle.listContainer,
              selectMethod == index
                ? {
                    borderColor: colorV2.strokeColor.primary,
                    backgroundColor: colorV2.bgColor.red,
                  }
                : { borderColor: colorV2.strokeColor.default },
            ]}
            onPress={() => {
              handleOnpress(index, item);
            }}>
            <Image
              source={{ uri: item.iconUrl }}
              style={PaymentMethodStyle.listImage}
            />
            <View style={PaymentMethodStyle.listName}>
              <SnbText2.Headline.Default>
                {item.displayLabel}
              </SnbText2.Headline.Default>
            </View>
          </TouchableOpacity>
        )
      }
    />
  );
};

export default PaymentMethodListView;
