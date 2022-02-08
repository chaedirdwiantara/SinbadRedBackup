/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbButton, SnbText, color, styles } from 'react-native-sinbad-ui';
import { VoucherCartListStyles } from '../styles';
import {
  countPotentialDiscount,
  goBack,
  useVoucherLocalData,
} from '../functions';
import { toCurrency } from '@core/functions/global/currency-format';
import * as models from '@models';
/** === INTERFACE === */
interface VoucherFooterProps {
  selectedSellerVoucher: models.SellerVoucherListProps[];
  selectedSinbadVoucher: models.SinbadVoucherProps | null;
}
/** === COMPONENT ===  */
export const VoucherFooter: FC<VoucherFooterProps> = ({
  selectedSellerVoucher,
  selectedSinbadVoucher,
}) => {
  const voucherLocalDataAction = useVoucherLocalData();

  let voucherTagTitle, voucherTagSubtitle;
  const isHaveBenefitValue = countPotentialDiscount(
    selectedSinbadVoucher,
    selectedSellerVoucher,
  ).isHaveBenefitValue;

  // check if selected voucher have benefit and not only percent
  if (isHaveBenefitValue) {
    voucherTagTitle = `Potensi potongan: ${toCurrency(
      countPotentialDiscount(selectedSinbadVoucher, selectedSellerVoucher)
        .totalDiscount,
      {
        withFraction: false,
      },
    )}`;
  } else {
    voucherTagTitle = 'Potensi potongan';
  }

  voucherTagSubtitle = `${
    countPotentialDiscount(selectedSinbadVoucher, selectedSellerVoucher)
      .totalSelectedVoucher
  } Voucher Terpilih`;

  return (
    <View style={[VoucherCartListStyles.footerSection, styles.shadowStyle]}>
      <View>
        <SnbText.B3 color={color.black60}>{voucherTagSubtitle}</SnbText.B3>
        <SnbText.C1 color={color.yellow50}>{voucherTagTitle}</SnbText.C1>
      </View>
      <View>
        <SnbButton.Dynamic
          testID={'voucherCartListView.useVoucherButton'}
          type={'primary'}
          title={'Gunakan Voucher'}
          onPress={() => {
            voucherLocalDataAction.set({
              sinbadVoucher: selectedSinbadVoucher,
              sellerVouchers: selectedSellerVoucher,
            });
            goBack();
          }}
          disabled={false}
          size={'small'}
        />
      </View>
    </View>
  );
};
