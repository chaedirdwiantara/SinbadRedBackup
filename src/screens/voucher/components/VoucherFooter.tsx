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
  return (
    <View style={[VoucherCartListStyles.footerSection, styles.shadowStyle]}>
      <View>
        <SnbText.B3 color={color.black60}>{`${
          countPotentialDiscount(selectedSinbadVoucher, selectedSellerVoucher)
            .totalSelectedVoucher
        } Voucher Terpilih`}</SnbText.B3>
        <SnbText.C1 color={color.yellow50}>
          {`Potensi Potongan: ${toCurrency(
            countPotentialDiscount(selectedSinbadVoucher, selectedSellerVoucher)
              .totalDiscount,
            { withFraction: false },
          )}`}
        </SnbText.C1>
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
