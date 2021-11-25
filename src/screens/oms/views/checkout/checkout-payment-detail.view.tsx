/** === IMPORT PACKAGE HERE ===  */
import { toCurrency } from '@core/functions/global/currency-format';
import CheckoutStyle from '@screen/oms/styles/checkout/checkout.style';
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color, SnbIcon } from 'react-native-sinbad-ui';
import { usePaymentDetailAccorrdion } from '../../functions/checkout';
/** === TYPE === */
export interface IPaymentDetail {
  name: string;
  value: number;
  type: string;
}

export interface CheckoutPaymentDetailViewProps {
  paymentDetails: IPaymentDetail[];
}

/** === COMPONENT === */
export const CheckoutPaymentDetailView: FC<CheckoutPaymentDetailViewProps> = ({
  paymentDetails,
}) => {
  /** === HOOK === */
  const paymentAccordion = usePaymentDetailAccorrdion();

  const isActive = paymentAccordion.active === 1;
  return (
    <View>
      {isActive ? (
        <View style={{ marginLeft: 32 }}>
          {paymentDetails.map((item, index) => {
            return (
              <View key={index} style={CheckoutStyle.detailItemContainer}>
                <SnbText.B3
                  color={
                    item.type === 'normal' ? color.black100 : color.green50
                  }>
                  {item.name}
                </SnbText.B3>
                <SnbText.B3
                  color={
                    item.type === 'normal' ? color.black100 : color.green50
                  }>
                  {toCurrency(item.value)}
                </SnbText.B3>
              </View>
            );
          })}
        </View>
      ) : (
        <View />
      )}
      <TouchableOpacity
        onPress={() => paymentAccordion.changeActive(1)}
        style={CheckoutStyle.detailExpandButton}>
        <View style={{ flexDirection: 'row' }}>
          <SnbIcon
            name={isActive ? 'expand_less' : 'expand_more'}
            size={24}
            color={color.black100}
          />
          <View style={{ marginLeft: 8 }}>
            <SnbText.H4>Sub Total</SnbText.H4>
          </View>
        </View>
        <SnbText.H4>Rp367.367,00</SnbText.H4>
      </TouchableOpacity>
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
