/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider, color } from 'react-native-sinbad-ui';
/** === COMPONENT ===  */
export const ShoppingCartAddress: FC = () => {
  return (
    <View style={{ backgroundColor: color.white, marginTop: 4, padding: 12 }}>
      <SnbText.H4>Alamat Pengiriman</SnbText.H4>
      <SnbDivider style={{ marginVertical: 4 }} />
      <View style={{ marginBottom: 4 }}>
        <SnbText.B2>Toko Ahmad</SnbText.B2>
      </View>
      <SnbText.B4 color={color.black60}>
        Jl. Kemang III No. 18, RT.12 / RW.2, Bangka, Kec. Mampang Prpt., Kota
        Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12730
      </SnbText.B4>
    </View>
  );
};
