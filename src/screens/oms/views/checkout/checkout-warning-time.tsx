/** === IMPORT PACKAGE HERE ===  */
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider, color, SnbIcon } from 'react-native-sinbad-ui';
/** === COMPONENT === */
export const CheckoutWarningTime: FC = () => {
  return (
    <View style={CheckoutStyle.warningTimer}>
      <View style={CheckoutStyle.warningTextContainer}>
        <SnbIcon name="info" color={color.yellow50} size={24} />
        <SnbText.B2 color={color.yellow50}>
          Anda memiliki waktu 5 menit untuk menyelesaikan checkout.
        </SnbText.B2>
      </View>
      <SnbDivider style={{ marginVertical: 8 }} />
    </View>
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Andi Chaedir Dwiantara (Valkyrie)
 * createDate: 04032022
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
