/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider, color } from 'react-native-sinbad-ui';
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
/** === COMPONENT ===  */
export const ShoppingCartAddress: FC = () => {
  /** => ACTION */
  const { stateCart } = React.useContext(contexts.CartContext);
  return (
    <View style={{ backgroundColor: color.white, marginTop: 4, padding: 12 }}>
      <SnbText.H4>Alamat Pengiriman</SnbText.H4>
      <SnbDivider style={{ marginVertical: 4 }} />
      <View style={{ marginBottom: 4 }}>
        <SnbText.B2>{`Toko ${stateCart.buyerAddress.data?.buyerName}`}</SnbText.B2>
      </View>
      <SnbText.B3 color={color.black60}>
        {stateCart.buyerAddress.data?.address}
        {stateCart.buyerAddress.data?.urban ? ',' : null}{' '}
        {stateCart.buyerAddress.data?.urban}
        {stateCart.buyerAddress.data?.district ? ',' : null}{' '}
        {stateCart.buyerAddress.data?.district}
        {stateCart.buyerAddress.data?.city ? ',' : null}{' '}
        {stateCart.buyerAddress.data?.city}
        {stateCart.buyerAddress.data?.province ? ',' : null}{' '}
        {stateCart.buyerAddress.data?.province}
      </SnbText.B3>
      <SnbText.B3 color={color.black60}>
        {stateCart.buyerAddress.data?.zipCode}
      </SnbText.B3>
    </View>
  );
};
