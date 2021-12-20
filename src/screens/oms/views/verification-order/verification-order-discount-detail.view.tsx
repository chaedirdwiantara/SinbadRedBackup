/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  SnbText,
  color,
  SnbBadge,
  SnbDivider,
  SnbIcon,
} from 'react-native-sinbad-ui';
import {
  VerificationOrderDetailPromoList,
  VerificationOrderDetailVoucherList,
} from '@models';
import { VerificationOrderStyle } from '../../styles';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
import { capitalize } from '@core/functions/global/capitalize';
/** === INTERFACE ===  */
interface VerificationOrderDiscountDetailProps {
  promoList: VerificationOrderDetailPromoList[];
  voucherList: VerificationOrderDetailVoucherList[];
  totalDiscount: number;
  accordionIndex: number | null;
  accordionSetter: (newIndex: number) => void;
  itemIndex: number;
}
/** === COMPONENT ===  */
export const VerificationOrderDiscountDetail: FC<
  VerificationOrderDiscountDetailProps
> = ({
  promoList,
  voucherList,
  totalDiscount,
  accordionIndex,
  accordionSetter,
  itemIndex,
}) => {
  return (
    <View>
      {itemIndex === accordionIndex ? (
        <View style={VerificationOrderStyle.listItemProductDiscountList}>
          {promoList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.promoOwner !== 'none' ? (
                  <SnbBadge.Label
                    type={'error'}
                    value={capitalize(item.promoOwner)}
                    iconName={'local_offer'}
                  />
                ) : (
                  <View />
                )}
                <View
                  style={VerificationOrderStyle.listItemProductDiscountItem}>
                  <View
                    style={VerificationOrderStyle.listItemProductDiscountName}>
                    <SnbText.B3>{item.promoSellerName}</SnbText.B3>
                  </View>
                  <SnbText.B3 color={color.green50}>
                    {toCurrency(item.promoAmount, { withFraction: false })}
                  </SnbText.B3>
                </View>
                <SnbDivider style={{ marginBottom: 12 }} />
              </React.Fragment>
            );
          })}
          {voucherList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.voucherOwner !== 'none' ? (
                  <SnbBadge.Label
                    type={'error'}
                    value={capitalize(item.voucherOwner)}
                    iconName={'local_offer'}
                  />
                ) : (
                  <View />
                )}
                <View
                  style={VerificationOrderStyle.listItemProductDiscountItem}>
                  <View
                    style={VerificationOrderStyle.listItemProductDiscountName}>
                    <SnbText.B3>{item.voucherSellerName}</SnbText.B3>
                  </View>
                  <SnbText.B3 color={color.green50}>
                    {toCurrency(item.voucherAmount, { withFraction: false })}
                  </SnbText.B3>
                </View>
                <SnbDivider style={VerificationOrderStyle.listDivider} />
              </React.Fragment>
            );
          })}
        </View>
      ) : (
        <View />
      )}
      <TouchableOpacity
        onPress={() => {
          accordionSetter(itemIndex);
        }}
        style={VerificationOrderStyle.listItemProductDiscountTouchable}>
        <View
          style={
            VerificationOrderStyle.listItemProductDiscountTotalTextContainer
          }>
          <SnbIcon
            name={itemIndex === accordionIndex ? 'expand_less' : 'expand_more'}
            size={24}
            color={color.black100}
          />
          <SnbText.B4>Total Potongan</SnbText.B4>
        </View>
        <SnbText.B4>
          {toCurrency(totalDiscount, { withFraction: false })}
        </SnbText.B4>
      </TouchableOpacity>
    </View>
  );
};
