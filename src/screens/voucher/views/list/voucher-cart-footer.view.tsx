import {
  colorV2,
  FooterButton,
  SnbText2,
  styles,
} from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import { View } from 'react-native';
import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import Svg from '@svg';
import { VoucherCartListStyles } from '@screen/voucher/styles';
import { useVoucherLocalData } from '@screen/voucher/functions';

interface VoucherCartFooterProps {
  selectedVoucher: models.EligibleVoucherProps | undefined;
  total: number;
  loading?: boolean;
  disabled?: boolean;
}

export const VoucherCartFooter: FC<VoucherCartFooterProps> = ({
  selectedVoucher,
  total,
  loading = false,
  disabled = false,
}) => {
  const potentialDiscount = toCurrency(selectedVoucher?.sinbadVoucherValue, {
    withFraction: false,
  });

  const { setSelectedVoucher } = useVoucherLocalData();

  return (
    <View style={{ justifyContent: 'flex-end' }}>
      {!!selectedVoucher && (
        <View style={{ backgroundColor: colorV2.bgColor.light }}>
          <View style={VoucherCartListStyles.footerMiniInfobar}>
            <View style={VoucherCartListStyles.iconLeft}>
              <Svg name="reward_voucher_yellow" size={24} />
            </View>
            <View style={VoucherCartListStyles.infobarDescription}>
              <SnbText2.Paragraph.Small color={colorV2.textColor.secondary}>
                {`Potensi Diskon: ${potentialDiscount}`}
              </SnbText2.Paragraph.Small>
            </View>
          </View>
        </View>
      )}
      <FooterButton.Checkout
        titleButton="Pakai Voucher"
        loading={loading}
        loadingButton={loading}
        disabled={disabled}
        value={total ?? 0}
        buttonPress={() =>
          setSelectedVoucher({
            voucherId: selectedVoucher?.sinbadVoucherId!,
            voucherValue: selectedVoucher?.sinbadVoucherValue!,
          })
        }
      />
    </View>
  );
};
