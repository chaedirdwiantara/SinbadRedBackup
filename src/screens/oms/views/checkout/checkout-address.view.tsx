/** === IMPORT PACKAGE HERE ===  */
import CheckoutStyle from '@screen/oms/styles/checkout/checkout.style';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider } from 'react-native-sinbad-ui';
/** === COMPONENT === */
export const CheckoutAddressView: FC = () => {
  return (
    <View style={CheckoutStyle.addessSection}>
      <SnbText.B2>Alamat Pengiriman</SnbText.B2>
      <SnbDivider style={{ marginVertical: 8 }} />
      <SnbText.B2>Alamat 1 (Default)</SnbText.B2>
      <SnbText.B1>
        Jl. M.H. Thamrin No.1, Kb. Melati, Kec. Menteng, Kota Jakarta Pusat,
        Daerah Khusus Ibukota Jakarta 10310
      </SnbText.B1>
    </View>
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Maulana Ghozi (pyramid)
 * createDate: 25112021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
