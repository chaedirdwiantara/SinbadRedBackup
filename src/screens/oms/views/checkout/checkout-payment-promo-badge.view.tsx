/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color, SnbIcon } from 'react-native-sinbad-ui';
import { goToPaymentPromoList } from '../../functions';
/** === COMPONENT === */
export const CheckoutPaymentPromoBadge: FC = () => {
  /** === HOOK === */

  /** => main */
  return (
    <TouchableOpacity
      onPress={() => goToPaymentPromoList()}
      style={CheckoutStyle.paymentPromoBadgeContainer}>
      <SnbIcon name={'info'} color={color.yellow50} size={24} />
      <View style={{ flexDirection: 'row' }}>
        <SnbText.B1 color={color.yellow50}>Pakai </SnbText.B1>
        <SnbText.B2 color={color.yellow50}>Bayar Sekarang, </SnbText.B2>
        <SnbText.B1 color={color.yellow50}>dapat promo!</SnbText.B1>
      </View>
      <SnbIcon name={'chevron_right'} color={color.yellow50} size={16} />
    </TouchableOpacity>
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
