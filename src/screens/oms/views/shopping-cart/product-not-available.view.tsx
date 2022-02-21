/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { SnbText, SnbCheckbox, SnbIcon, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartStyles } from '@screen/oms/styles';
import * as models from '@models';

interface ProductUnavailableViewProps {
  unavailableProducts: models.CartMasterUnavailable[];
}

export const ProductUnavailableView: FC<ProductUnavailableViewProps> = ({
  unavailableProducts,
}) => {
  return (
    <React.Fragment>
      {unavailableProducts.map((item) => {
        return (
          <View
            style={{
              ...ShoppingCartStyles.horizontalBottomCardSlot,
            }}
            key={`${item.sellerId}.${item.productId}`}>
            <View
              style={{
                flexDirection: 'column',
                width: '100%',
              }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    marginRight: 20,
                    marginLeft: 4,
                    justifyContent: 'center',
                  }}>
                  <SnbCheckbox
                    disabled={true}
                    status={'unselect'}
                    onPress={() => {}}
                  />
                </View>
                <TouchableOpacity
                  style={{ alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {}}>
                  <Image
                    source={{
                      uri: item.productImageUrl,
                    }}
                    style={{
                      width: 65,
                      height: 65,
                      marginRight: 5,
                      opacity: 0.5,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
                      width: '100%',
                    }}>
                    <SnbText.B4 color={color.black60}>
                      {item.productName}
                    </SnbText.B4>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <SnbText.B4 color={color.black80}>{item.status}</SnbText.B4>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: 12,
                }}>
                <TouchableOpacity onPress={() => {}}>
                  <SnbText.B4 color={color.blue50}>
                    Cari Produk Sejenis
                  </SnbText.B4>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <SnbIcon
                    name="delete_outline"
                    color={color.black80}
                    size={32}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      })}
    </React.Fragment>
  );
};
