import { View, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { FC, useState } from 'react';
import { SnbText2, colorV2 } from '@sinbad/react-native-sinbad-ui';
import { PaymentMethodStyle } from '@screen/oms/styles';
import * as models from '@models';
import { Brightness, Grayscale } from 'react-native-color-matrix-image-filters';
interface PaymentMethodListProps {
  payMethod: models.PaymentMethod[];
  onSelectMethod: (selected: string) => void;
  dataChoosen: (data: any) => void;
  dataSelected?: string; //to trigger pressed effect on another index list when there're more than 1 index from data
}

const PaymentMethodListView: FC<PaymentMethodListProps> = ({
  payMethod,
  onSelectMethod,
  dataChoosen,
  dataSelected,
}) => {
  const [selectMethod, setSelectMethod] = useState(-1); //handle selected method
  const [pressed, setPressed] = useState(false); //handle isAlready selected

  const handleOnpress = (data: number, item: models.PaymentMethod) => {
    onSelectMethod(data.toString());
    dataChoosen(item);
    setSelectMethod(data);
    setPressed(true);
  };

  return payMethod ? (
    <FlatList
      keyExtractor={(_, index) => index.toString()}
      data={payMethod}
      renderItem={({ item, index }) =>
        pressed === false && item.isSelected === true && dataSelected === '' ? (
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
        ) : item?.status === false ? (
          <View style={[PaymentMethodStyle.listContainer]}>
            <Grayscale amount={1}>
              <Brightness amount={1}>
                <Image
                  source={{ uri: item.iconUrl }}
                  style={PaymentMethodStyle.listImage}
                />
              </Brightness>
            </Grayscale>
            <View style={PaymentMethodStyle.listName}>
              <SnbText2.Headline.Default>
                {item.displayLabel}
              </SnbText2.Headline.Default>
              <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
                Tidak tersedia untuk transaksi ini
              </SnbText2.Paragraph.Small>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              PaymentMethodStyle.listContainer,
              selectMethod == index && item.displayLabel == dataSelected
                ? {
                    borderColor: colorV2.strokeColor.primary,
                    backgroundColor: colorV2.bgColor.red,
                  }
                : null,
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
  ) : (
    <View style={PaymentMethodStyle.listContainer}>
      <View
        style={[
          PaymentMethodStyle.loadList,
          { flex: 1, marginRight: 8 },
        ]}></View>
      <View style={[PaymentMethodStyle.loadList, { flex: 5 }]}></View>
    </View>
  );
};

export default PaymentMethodListView;
