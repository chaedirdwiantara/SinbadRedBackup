/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
import { contexts } from '@contexts';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ShoppingCartStyles } from '../../styles';
/** === DUMMY === */
const userName = 'Edward';
const address =
  'Jl. Kemang III No.18, RT.12/RW.2, Bangka, Kec. Mampang Prpt.,Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730';

/** === COMPONENT === */
export const ShippingAddress: FC = () => {
  const { stateUser } = React.useContext(contexts.UserContext);

  console.log('[stateUser]: ', stateUser);
  return (
    <View style={ShoppingCartStyles.cardContainer}>
      <View style={ShoppingCartStyles.topCardSlot}>
        <SnbText.B4>Alamat Pengiriman</SnbText.B4>
      </View>
      <View style={ShoppingCartStyles.verticalBottomCardSlot}>
        <View style={{ marginBottom: 6 }}>
          <SnbText.B4>{userName}</SnbText.B4>
        </View>
        <View style={{ marginBottom: 6 }}>
          <SnbText.C2>Alamat 1 (default)</SnbText.C2>
        </View>
        <SnbText.B3>{address}</SnbText.B3>
      </View>
    </View>
  );
};
