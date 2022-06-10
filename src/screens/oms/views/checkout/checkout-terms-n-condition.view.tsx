import { CheckoutStyle } from '@screen/oms/styles';
import { SnbText2, colorV2 } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface CheckoutTNCViewProps {
  clickAction: () => void;
}
/** === COMPONENT === */
export const CheckoutTNCView: FC<CheckoutTNCViewProps> = ({ clickAction }) => {
  return (
    <View style={CheckoutStyle.tncLabelSection}>
      <TouchableOpacity onPress={clickAction}>
        <SnbText2.Body.Small align="center" color={colorV2.textColor.default}>
          Dengan melanjutkan pembayaran, berarti Anda setuju dengan{' '}
          <SnbText2.Body.Small align="center" color={colorV2.textColor.link}>
            syarat dan ketentuan Sinbad.
          </SnbText2.Body.Small>
        </SnbText2.Body.Small>
      </TouchableOpacity>
    </View>
  );
};
