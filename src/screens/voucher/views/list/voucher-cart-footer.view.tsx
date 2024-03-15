import { FooterButton } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';
import { View } from 'react-native';
import * as models from '@models';
import { toCurrency } from '@core/functions/global/currency-format';
import { goBack, useUpdateVisibilityVoucherAction, useVoucherLocalData } from '@screen/voucher/functions';
import { contexts } from '@contexts';

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
  const { dispatchVoucher } = React.useContext(contexts.VoucherContext);
  const updateVisibilityVoucherAction = useUpdateVisibilityVoucherAction();
  const { setSelectedVoucher } = useVoucherLocalData();

  const potentialDiscount = toCurrency(selectedVoucher?.sinbadVoucherValue, {
    withFraction: false,
  });

  return (
    <View style={{ justifyContent: 'flex-end' }}>
      <FooterButton.Voucher
        titleButton="Pakai Voucher"
        loading={loading}
        loadingButton={loading}
        disabled={disabled}
        value={total ?? 0}
        voucherTitle={`Potensi Diskon: ${potentialDiscount}`}
        voucherStatus={selectedVoucher ? 'yellow' : 'hidden'}
        buttonPress={() => {
          setSelectedVoucher({
            voucherId: selectedVoucher?.sinbadVoucherId!,
            voucherValue: selectedVoucher?.sinbadVoucherValue!,
          });

          updateVisibilityVoucherAction.update(
            dispatchVoucher,
            selectedVoucher?.id!,
          );

          goBack();
        }}
      />
    </View>
  );
};
