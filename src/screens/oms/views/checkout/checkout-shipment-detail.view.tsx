/** === IMPORT PACKAGE HERE ===  */
import CheckoutStyle from '@screen/oms/styles/checkout/checkout.style';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider, color } from 'react-native-sinbad-ui';
/** === COMPONENT === */
export const CheckoutShipmentDetailView: FC = () => {
  return (
    <View style={{ marginTop: 16 }}>
      <SnbText.H4>Rincian Pengiriman</SnbText.H4>
      <SnbDivider style={{ marginVertical: 8 }} />
      <View style={CheckoutStyle.shipmentDetail}>
        <View>
          <SnbText.B1>(± 3 Hari)</SnbText.B1>
          <SnbText.B3>Self Delivery</SnbText.B3>
        </View>
        <SnbText.B3 color={color.green50}>FREE ONGKIR</SnbText.B3>
      </View>
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
