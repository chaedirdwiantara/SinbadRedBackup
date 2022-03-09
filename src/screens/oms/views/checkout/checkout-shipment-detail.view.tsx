/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
/** === COMPONENT === */
export const CheckoutShipmentDetailView: FC = () => {
  return (
    <View style={{ marginTop: 16 }}>
      <SnbText.H4 color={color.black80}>Detail Pengiriman</SnbText.H4>
      <View style={CheckoutStyle.shipmentDetail}>
        <View style={CheckoutStyle.shipmentIcon}>
          <Image
            source={require('../../../../assets/icons/oms/delivery.png')}
            style={CheckoutStyle.deliveryIcon}
          />
          <View style={{ marginLeft: 6 }}>
            <SnbText.B3 color={color.black80}>Pengiriman</SnbText.B3>
            <SnbText.B4 color={color.black100}>
              Pengiriman Supplier (3 hari)
            </SnbText.B4>
          </View>
        </View>
        <View style={CheckoutStyle.shipmentTxt}>
          <SnbText.B3 color={color.black80}>Bebas Ongkir</SnbText.B3>
        </View>
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
