/** === IMPORT PACKAGE HERE ===  */
import { testProps } from '@core/functions/global/test-props';
import { CheckoutStyle } from '@screen/oms/styles';
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText2, colorV2, SnbIcon } from 'react-native-sinbad-ui';
/** === INTERFACES === */
interface CheckoutWarningTimeProps {
  testID: string;
}
/** === COMPONENT === */
export const CheckoutWarningTime: FC<CheckoutWarningTimeProps> = ({
  testID,
}) => {
  return (
    <View style={CheckoutStyle.warningTimer}>
      <View style={CheckoutStyle.warningTextContainer}>
        <View style={{ marginRight: 16 }}>
          <SnbIcon
            {...testProps(`icon.warningTime.${testID}`)}
            name="info"
            color={colorV2.textColor.warning}
            size={16}
          />
        </View>
        <SnbText2.Paragraph.Small
          testID={`value.warningTime.${testID}`}
          color={colorV2.textColor.warning}>
          Anda memiliki waktu 5 menit untuk menyelesaikan checkout.
        </SnbText2.Paragraph.Small>
      </View>
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
