/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbButton, color } from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface FooterProps {
  onPressCheckout: () => void;
}
/** === COMPONENT ===  */
export const ShoppingCartFooter: FC<FooterProps> = ({ onPressCheckout }) => {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: color.white,
        justifyContent: 'flex-end',
        elevation: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SnbText.B2 color={color.black60}>Total: </SnbText.B2>
            <SnbText.H4 color={color.red50}>Rp0</SnbText.H4>
          </View>
          <SnbText.B4 color={color.black60}>0 barang dipilih</SnbText.B4>
        </View>
        <View>
          <SnbButton.Dynamic
            title="Checkout"
            type="primary"
            onPress={() => onPressCheckout()}
            size={'large'}
          />
        </View>
      </View>
    </View>
  );
};
