/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbText } from 'react-native-sinbad-ui';
import { VerificationOrderDetailBonusProduct } from '@models';
import { VerificationOrderStyle } from '../../styles';
/** === INTERFACE ===  */
interface VerificationOrderBonusItemProps {
  data: VerificationOrderDetailBonusProduct;
}
/** === COMPONENT ===  */
export const VerificationOrderBonusItem: FC<
  VerificationOrderBonusItemProps
> = ({ data }) => {
  return (
    <View style={VerificationOrderStyle.listItemContainer}>
      <Image
        source={{
          uri: data.bonusProductImageUrl,
        }}
        style={VerificationOrderStyle.listItemProductImage}
      />
      <View style={VerificationOrderStyle.listItemProductDetailContainer}>
        <View style={VerificationOrderStyle.listItemProductNameContainer}>
          <SnbText.B4>{data.bonusProductName}</SnbText.B4>
        </View>
        <SnbText.C3>{data.promoSellerName}</SnbText.C3>
        <SnbText.C2>{`x${data.bonusQty} Pcs`}</SnbText.C2>
      </View>
    </View>
  );
};
