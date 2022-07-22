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
      <View style={{ marginVertical: 4 }}>
        <SnbDivider2 />
      </View>
      <View style={{ marginBottom: 4 }}>
        <SnbText2.Body.Small
          color={
            colorV2.textColor.default
          }>{`${stateCart.checkBuyer.data?.buyerName}`}</SnbText2.Body.Small>
      </View>
      <SnbText2.Paragraph.Tiny color={colorV2.textColor.secondary}>
        {stateCart.checkBuyer.data?.address}
        {stateCart.checkBuyer.data?.urban ? ',' : null}{' '}
        {stateCart.checkBuyer.data?.urban}
        {stateCart.checkBuyer.data?.district ? ',' : null}{' '}
        {stateCart.checkBuyer.data?.district}
        {stateCart.checkBuyer.data?.city ? ',' : null}{' '}
        {stateCart.checkBuyer.data?.city}
        {stateCart.checkBuyer.data?.province ? ',' : null}{' '}
        {stateCart.checkBuyer.data?.province}
        {stateCart.checkBuyer.data?.zipCode ? ' ' : null}
        {stateCart.checkBuyer.data?.zipCode}
      </SnbText2.Paragraph.Tiny>
    </View>
  );
};
