/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === IMPORT EXTERNAL COMPONENT HERE === */
import { ProductUnavailableView } from './product-not-available.view';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === IMPORT EXTERNAL HOOK FUNCTION HERE === */
/** === IMPORT OTHER HERE === */
import { ShoppingCartStyles } from '@screen/oms/styles';
/** === COMPONENT === */
export const ProductNotAvailableSection: FC = () => {
  /** === HOOKS === */
  /** === VIEW === */
  /** => Main */
  return (
    <View
      style={{
        flexDirection: 'column',
      }}>
      <View style={ShoppingCartStyles.unavailableHeaderContainer}>
        <SnbText.B4 color={color.black100}>Tidak bisa diproses</SnbText.B4>
        <View>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: '100%',
            }}>
            <SnbText.B4 color={color.blue50}>Hapus</SnbText.B4>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ ...ShoppingCartStyles.cardContainer, marginTop: 0 }}>
        <ProductUnavailableView />
      </View>
    </View>
  );
};
