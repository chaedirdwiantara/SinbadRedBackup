/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider, color } from 'react-native-sinbad-ui';

export interface CheckoutAddressProps {
  buyerName: string;
  buyerAddress: {};
}

/** === COMPONENT === */
export const CheckoutAddressView: FC<CheckoutAddressProps> = ({
  buyerAddress,
  buyerName,
}) => {
  return (
    <View style={CheckoutStyle.addessSection}>
      <SnbText.H4>Alamat Pengiriman</SnbText.H4>
      <SnbDivider style={{ marginVertical: 8 }} />
      <View style={{ marginBottom: 6 }}>
        <SnbText.B2>{buyerName}</SnbText.B2>
      </View>
      <SnbText.B3 color={color.black60}>
        {buyerAddress.address}, {buyerAddress.urban}, {buyerAddress.district},{' '}
        {buyerAddress.city}, {buyerAddress.province}
      </SnbText.B3>
      <SnbText.B3 color={color.black60}>{buyerAddress.zipCode}</SnbText.B3>
    </View>
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Maulana Ghozi (pyramid)
 * createDate: 25112021
 * updatedBy: Andi Chaedir Dwiantara (valkyrie)
 * updatedDate: 08032022
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
