/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider } from 'react-native-sinbad-ui';
import { VerificationOrderDetailBonusProduct } from '@models';
import { VerificationOrderStyle } from '../../styles';
import { VerificationOrderBonusItem } from './verification-order-bonus-item.view';
/** === INTERFACE ===  */
interface VerificationOrderDiscountListProps {
  bonusProducts: VerificationOrderDetailBonusProduct[];
}
/** === COMPONENT ===  */
export const VerificationOrderBonusList: FC<
  VerificationOrderDiscountListProps
> = ({ bonusProducts }) => {
  if (bonusProducts.length === 0) {
    return null;
  }

  return (
    <View>
      <View style={VerificationOrderStyle.listHeader}>
        <SnbText.B4>{'Bonus SKU'}</SnbText.B4>
      </View>
      {bonusProducts.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <VerificationOrderBonusItem data={item} />
            <SnbDivider style={VerificationOrderStyle.listDivider} />
          </React.Fragment>
        );
      })}
    </View>
  );
};
