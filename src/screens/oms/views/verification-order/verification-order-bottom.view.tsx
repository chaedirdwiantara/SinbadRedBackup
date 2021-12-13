/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbText, SnbDivider, color, SnbButton } from 'react-native-sinbad-ui';
import { VerificationOrderDetailProps } from '@models';
import { VerificationOrderStyle } from '../../styles';
import { toCurrency } from '@core/functions/global/currency-format';
/** === INTERFACE ===  */
interface VerificationOrderBottomProps {
  data: VerificationOrderDetailProps;
  buttonLoading: boolean;
  buttonDisabled: boolean;
  buttonOnPress: () => void;
}
/** === COMPONENT ===  */
export const VerificationOrderBottom: FC<VerificationOrderBottomProps> = ({
  data,
  buttonLoading,
  buttonDisabled,
  buttonOnPress,
}) => {
  return (
    <View style={VerificationOrderStyle.bottomContainer}>
      <View>
        <View style={VerificationOrderStyle.bottomTextContainer}>
          <SnbText.B4>Total (Sebelum Pajak)</SnbText.B4>
          <SnbDivider style={{ marginVertical: 8 }} />
          <View style={VerificationOrderStyle.bottomTextRow}>
            <SnbText.B3>Total Transaksi</SnbText.B3>
            <SnbText.B3>
              {toCurrency(data.grandTotal.grandTotalPrice)}
            </SnbText.B3>
          </View>
          <View style={VerificationOrderStyle.bottomTextRow}>
            <SnbText.B3>Total Potongan</SnbText.B3>
            <SnbText.B3 color={color.green50}>
              {toCurrency(data.grandTotal.grandTotalDiscount)}
            </SnbText.B3>
          </View>
        </View>
        <View style={VerificationOrderStyle.bottomButtonContainer}>
          <SnbButton.Single
            type={'primary'}
            title={'Lanjut Ke Pembayaran'}
            loading={buttonLoading}
            disabled={buttonDisabled}
            onPress={() => buttonOnPress()}
          />
        </View>
      </View>
    </View>
  );
};
