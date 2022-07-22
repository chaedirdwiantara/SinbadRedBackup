import React, { FC, useEffect } from 'react';
import { SnbContainer, SnbRadioGroup } from '@sinbad/react-native-sinbad-ui';
import { View } from 'react-native';
import { VoucherCard } from '@core/components/VoucherCard';
import * as models from '@models';
import { VoucherCartListStyles } from '../../styles';
import { toCurrency } from '@core/functions/global/currency-format';
import { useSelectedVoucher } from '@screen/voucher/functions';

interface VoucherCartListProps {
  eligibleVouchers: models.EligibleVoucherProps[];
  notEligibleVouchers: models.NotEligibleVoucherProps[];
  onSelectedChange: (voucher: number) => void;
  selectedVoucher?: models.EligibleVoucherProps;
}

export const VoucherCartList: FC<VoucherCartListProps> = ({
  eligibleVouchers,
  notEligibleVouchers,
  onSelectedChange,
  ...props
}) => {
  const getSubtitle = (remainingDay: number) => {
    if (remainingDay > 0) {
      return `Berakhir dalam ${remainingDay} hari lagi!`;
    }

    return 'Berakhir hari ini';
  };

  return (
    <SnbContainer color="grey">
      <View style={VoucherCartListStyles.container}>
        <SnbRadioGroup 
          value={props?.selectedVoucher?.id}
          onChange={(value) => onSelectedChange(value)}>
          {eligibleVouchers &&
            eligibleVouchers.map((voucher) => {
            const subtitle = getSubtitle(voucher.remainingDay);

              return (
                <View
                  key={`${voucher.name.split(' ').join('')}-${voucher.id}`}
                  style={VoucherCartListStyles.cardContainer}>
                  <VoucherCard
                    name="Sinbad"
                    title={voucher.name}
                    subtitle={subtitle}
                    value={voucher.id}
                    onPress={() => {}}
                    type="eligible"
                  />
                </View>
              );
            })}

          {notEligibleVouchers &&
            notEligibleVouchers.map((voucher) => {
              const subtitle = getSubtitle(voucher.remainingDay);
              const currency = toCurrency(voucher.minOrderTransaction, {
                withFraction: false,
              });
              const helperText = `Min. pembelian ${currency}`;

              return (
                <View
                  key={`${voucher.name.split(' ').join('')}-${voucher.id}`}
                  style={VoucherCartListStyles.cardContainer}>
                  <VoucherCard
                    name="Sinbad"
                    title={voucher.name}
                    subtitle={subtitle}
                    value={voucher.id}
                    onPress={() => {}}
                    type="not-eligible"
                    helperText={helperText}
                  />
                </View>
              );
            })}
        </SnbRadioGroup>
      </View>
    </SnbContainer>
  );
};
