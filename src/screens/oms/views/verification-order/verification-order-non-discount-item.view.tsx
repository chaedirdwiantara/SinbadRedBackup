/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { VerificationOrderDetailNonPromoList } from '@models';
import { VerificationOrderStyle } from '../../styles';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
/** === INTERFACE ===  */
interface VerificationOrderNonDiscountItemProps {
  data: VerificationOrderDetailNonPromoList;
}
/** === COMPONENT ===  */
export const VerificationOrderNonDiscountItem: FC<VerificationOrderNonDiscountItemProps> =
  ({ data }) => {
    return (
      <View style={VerificationOrderStyle.listItemContainer}>
        <Image
          source={{
            uri: data.productImageUrl,
          }}
          style={VerificationOrderStyle.listItemProductImage}
        />
        <View style={VerificationOrderStyle.listItemProductDetailContainer}>
          <View style={VerificationOrderStyle.listItemProductNameContainer}>
            <SnbText.B4>{data.productName}</SnbText.B4>
          </View>
          <SnbText.C2>{`x${data.qty} Pcs`}</SnbText.C2>
          <SnbText.C2 color={color.red50}>
            {toCurrency(data.displayPrice)}
          </SnbText.C2>
          <View style={VerificationOrderStyle.listItemProductPriceContainer}>
            <SnbText.C2>Total</SnbText.C2>
            <SnbText.C2>{toCurrency(data.displayPrice * data.qty)}</SnbText.C2>
          </View>
        </View>
      </View>
    );
  };