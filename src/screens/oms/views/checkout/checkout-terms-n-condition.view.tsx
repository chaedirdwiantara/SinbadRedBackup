import { testProps } from '@core/functions/global/test-props';
import { CheckoutStyle } from '@screen/oms/styles';
import { SnbText2, colorV2 } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface CheckoutTNCViewProps {
  clickAction: () => void;
  testID: string;
}
/** === COMPONENT === */
export const CheckoutTNCView: FC<CheckoutTNCViewProps> = ({
  clickAction,
  testID,
}) => {
  return (
    <View style={CheckoutStyle.tncLabelSection}>
      <TouchableOpacity
        {...testProps(`btn-openModalTnC.termsAndCondition.${testID}`)}
        onPress={clickAction}>
        <SnbText2.Body.Small
          testID={`title.btn-openModalTnC.termsAndCondition.${testID}`}
          align="center"
          color={colorV2.textColor.default}>
          Dengan melanjutkan pembayaran, berarti Anda setuju dengan{' '}
          <SnbText2.Body.Small
            testID={`subTitle.btn-openModalTnC.termsAndCondition.${testID}`}
            align="center"
            color={colorV2.textColor.link}>
            Syarat dan Ketentuan Sinbad.
          </SnbText2.Body.Small>
        </SnbText2.Body.Small>
      </TouchableOpacity>
    </View>
  );
};
