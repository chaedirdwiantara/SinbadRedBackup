/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { SnbText2, colorV2 } from 'react-native-sinbad-ui';
/** === COMPONENT === */
interface CheckoutShipmentDetailViewProps {
  leadTime: number;
  testID: string;
}
export const CheckoutShipmentDetailView: FC<
  CheckoutShipmentDetailViewProps
> = ({ leadTime, testID }) => {
  return (
    <View style={{ marginTop: 16 }}>
      <View style={CheckoutStyle.shipmentDetail}>
        <View style={CheckoutStyle.shipmentIcon}>
          <Image
            testID={`img.shipment.${testID}`}
            source={require('../../../../assets/icons/oms/delivery.png')}
            style={CheckoutStyle.deliveryIcon}
          />
          <View style={{ marginLeft: 6 }}>
            <SnbText2.Paragraph.Small
              testID={`deliveryLabel.shipment.${testID}`}
              color={colorV2.textColor.secondary}>
              Pengiriman
            </SnbText2.Paragraph.Small>
            <SnbText2.Body.Small
              testID={`deliveryValue.shipment.${testID}`}
              color={colorV2.textColor.default}>
              {`Pengiriman Supplier (${leadTime} hari)`}
            </SnbText2.Body.Small>
          </View>
        </View>
        <View style={CheckoutStyle.shipmentTxt}>
          <SnbText2.Caption.Small
            testID={`freeShipmentLabel.shipment.${testID}`}
            color={colorV2.textColor.secondary}>
            Bebas Ongkir
          </SnbText2.Caption.Small>
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
