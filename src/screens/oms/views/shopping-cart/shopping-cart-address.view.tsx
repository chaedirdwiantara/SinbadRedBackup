/** === IMPORT PACKAGE HERE ===  */
import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider, color } from 'react-native-sinbad-ui';
/** === IMPORT INTERNAL FUNCTION HERE === */
import { useCartBuyerAddressAction } from '../../functions';
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
/** === COMPONENT ===  */
export const ShoppingCartAddress: FC = () => {
  /** => ACTION */
  const { stateCart, dispatchCart } = React.useContext(contexts.CartContext);
  const cartBuyerAddressAction = useCartBuyerAddressAction();
  useEffect(() => {
    cartBuyerAddressAction.fetch(dispatchCart);
  }, []);
  return (
    <View style={{ backgroundColor: color.white, marginTop: 4, padding: 12 }}>
      <SnbText.H4>Alamat Pengiriman</SnbText.H4>
      <SnbDivider style={{ marginVertical: 4 }} />
      <View style={{ marginBottom: 4 }}>
        <SnbText.B2>{`Toko ${stateCart.buyerAddress.data?.buyerName}`}</SnbText.B2>
      </View>
      <SnbText.B4 color={color.black60}>
        {stateCart.buyerAddress.data?.address}
      </SnbText.B4>
    </View>
  );
};
