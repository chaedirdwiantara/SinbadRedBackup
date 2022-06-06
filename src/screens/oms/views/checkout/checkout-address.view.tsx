/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText2, SnbDivider2, colorV2 } from 'react-native-sinbad-ui';
import * as models from '@models';

export interface CheckoutAddressProps {
  buyerName: string;
  buyerAddress: models.CheckoutBuyerAddressPayload;
}

/** === COMPONENT === */
export const CheckoutAddressView: FC<CheckoutAddressProps> = ({
  buyerAddress,
  buyerName,
}) => {
  return (
    <View style={CheckoutStyle.addessSection}>
      <SnbText2.Headline.Small color={colorV2.textColor.default}>
        Alamat Pengiriman
      </SnbText2.Headline.Small>
      <SnbDivider2 />
      <View style={{ marginBottom: 6 }}>
        <SnbText2.Body.Small color={colorV2.textColor.default}>
          {buyerName}
        </SnbText2.Body.Small>
      </View>
      <SnbText2.Paragraph.Tiny color={colorV2.textColor.secondary}>
        {buyerAddress.address}
        {buyerAddress.urban ? ',' : null} {buyerAddress.urban}
        {buyerAddress.district ? ',' : null} {buyerAddress.district}
        {buyerAddress.city ? ',' : null} {buyerAddress.city}
        {buyerAddress.province ? ',' : null} {buyerAddress.province}
      </SnbText2.Paragraph.Tiny>
      <SnbText2.Paragraph.Tiny color={colorV2.textColor.secondary}>
        {buyerAddress?.zipCode}
      </SnbText2.Paragraph.Tiny>
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
