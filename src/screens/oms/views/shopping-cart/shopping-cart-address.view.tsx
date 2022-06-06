/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText2, SnbDivider2, colorV2 } from 'react-native-sinbad-ui';
/** === IMPORT OTHER HERE === */
import { contexts } from '@contexts';
/** === COMPONENT ===  */
export const ShoppingCartAddress: FC = () => {
  /** => ACTION */
  const { stateCart } = React.useContext(contexts.CartContext);
  return (
    <View
      style={{
        backgroundColor: colorV2.bgColor.light,
        marginTop: 4,
        padding: 12,
      }}>
      <SnbText2.Headline.Small color={colorV2.textColor.default}>
        Alamat Pengiriman
      </SnbText2.Headline.Small>
      <SnbDivider2 />
      <View style={{ marginBottom: 4 }}>
        <SnbText2.Body.Small
          color={
            colorV2.textColor.default
          }>{`Toko ${stateCart.buyerAddress.data?.buyerName}`}</SnbText2.Body.Small>
      </View>
      <SnbText2.Paragraph.Tiny color={colorV2.textColor.secondary}>
        {stateCart.buyerAddress.data?.address}
        {stateCart.buyerAddress.data?.urban ? ',' : null}{' '}
        {stateCart.buyerAddress.data?.urban}
        {stateCart.buyerAddress.data?.district ? ',' : null}{' '}
        {stateCart.buyerAddress.data?.district}
        {stateCart.buyerAddress.data?.city ? ',' : null}{' '}
        {stateCart.buyerAddress.data?.city}
        {stateCart.buyerAddress.data?.province ? ',' : null}{' '}
        {stateCart.buyerAddress.data?.province}
        {stateCart.buyerAddress.data?.zipCode ? ' ' : null}
        {stateCart.buyerAddress.data?.zipCode}
      </SnbText2.Paragraph.Tiny>
    </View>
  );
};
