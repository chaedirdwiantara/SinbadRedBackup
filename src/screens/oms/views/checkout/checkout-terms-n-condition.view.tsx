import { CheckoutStyle } from '@screen/oms/styles';
import { SnbText, color } from '@sinbad/react-native-sinbad-ui';
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
        <SnbText.B3 align="center">
          Dengan melanjutkan pembayaran, berarti Anda setuju dengan{' '}
          <SnbText.B3 color={color.blue50}>
            syarat dan ketentuan Sinbad.
          </SnbText.B3>
        </SnbText.B3>
      </TouchableOpacity>
    </View>
  );
};
