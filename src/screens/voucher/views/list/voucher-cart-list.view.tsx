import React, { FC } from 'react';
import { SnbContainer, SnbRadioGroup } from '@sinbad/react-native-sinbad-ui';
import { View, ScrollView } from 'react-native';
import { VoucherCard } from '@core/components/VoucherCard';
import * as models from '@models';
import { VoucherCartListStyles } from '../../styles';
import { toCurrency } from '@core/functions/global/currency-format';
import { NavigationAction } from '@core/functions/navigation';
import {
  reorderVoucherList,
  useVoucherLocalData,
} from '@screen/voucher/functions';

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
  const { selectedVoucher } = useVoucherLocalData();
  const getSubtitle = (remainingDay: number) => {
    if (remainingDay > 0) {
      if (remainingDay > 30) {
        return 'Berakhir dalam >30 hari lagi!';
      }
      return `Berakhir dalam ${remainingDay} hari lagi!`;
    }

    return 'Berakhir hari ini!';
  };

  const eligibleVoucherFiltered = reorderVoucherList(
    eligibleVouchers,
    selectedVoucher!,
  );

  return (
    <SnbContainer color="grey">
      <ScrollView style={VoucherCartListStyles.container}>
        <SnbRadioGroup
          value={props?.selectedVoucher?.sinbadVoucherId}
          onChange={(value) => onSelectedChange(value as number)}>
          {eligibleVoucherFiltered &&
            eligibleVoucherFiltered.map((voucher) => {
              const subtitle = getSubtitle(voucher?.remainingDay);

              return (
                <View
                  key={`${voucher?.sinbadVoucherId}-${voucher?.id}`}
                  style={VoucherCartListStyles.cardContainer}>
                  <VoucherCard
                    name="Sinbad"
                    title={voucher?.name}
                    subtitle={subtitle}
                    value={voucher?.sinbadVoucherId}
                    onPress={() =>
                      NavigationAction.navigate('VoucherDetailView', {
                        id: voucher.id,
                        sinbadVoucherId: voucher?.sinbadVoucherId,
                        value: voucher?.sinbadVoucherValue,
                        type: 'eligible',
                      })
                    }
                    type="eligible"
                  />
                </View>
              );
            })}

          {notEligibleVouchers &&
            notEligibleVouchers.map((voucher) => {
              const subtitle = getSubtitle(voucher?.remainingDay);
              const currency = toCurrency(voucher?.minOrderTransaction, {
                withFraction: false,
              });
              const helperText = `Min. pembelian ${currency}`;

              return (
                <View
                  key={`${voucher?.sinbadVoucherId}-${voucher?.id}`}
                  style={VoucherCartListStyles.cardContainer}>
                  <VoucherCard
                    name="Sinbad"
                    title={voucher?.name}
                    subtitle={subtitle}
                    value={voucher?.sinbadVoucherId}
                    onPress={() =>
                      NavigationAction.navigate('VoucherDetailView', {
                        id: voucher.id,
                        sinbadVoucherId: voucher?.sinbadVoucherId,
                        value: voucher?.sinbadVoucherValue,
                        type: 'not-eligible',
                      })
                    }
                    type="not-eligible"
                    helperText={helperText}
                  />
                </View>
              );
            })}
        </SnbRadioGroup>
      </ScrollView>
    </SnbContainer>
  );
};
