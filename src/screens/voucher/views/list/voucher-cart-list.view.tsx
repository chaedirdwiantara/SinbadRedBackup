import React, { FC } from 'react';
import { SnbContainer, SnbRadioGroup } from '@sinbad/react-native-sinbad-ui';
import { View, ScrollView } from 'react-native';
import { VoucherCard } from '@core/components/VoucherCard';
import * as models from '@models';
import { VoucherCartListStyles } from '../../styles';
import { toCurrency } from '@core/functions/global/currency-format';
import { NavigationAction } from '@core/functions/navigation';

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
      if (remainingDay > 30) {
        return 'Berakhir >30 hari lagi!';
      }
      return `Berakhir dalam ${remainingDay} hari lagi!`;
    }

    return 'Berakhir hari ini!';
  };

  return (
    <SnbContainer color="grey">
      <ScrollView style={VoucherCartListStyles.container}>
        <SnbRadioGroup 
          value={props?.selectedVoucher?.sinbadVoucherId}
          onChange={(value) => onSelectedChange(value as number)}>
          {props?.selectedVoucher && (
            <View style={VoucherCartListStyles.cardContainer}>
              <VoucherCard
                name="Sinbad"
                title={props?.selectedVoucher.name}
                subtitle={getSubtitle(props?.selectedVoucher?.remainingDay)}
                value={props?.selectedVoucher.sinbadVoucherId}
                onPress={() =>
                  NavigationAction.navigate('VoucherDetailView', {
                    id: props?.selectedVoucher?.sinbadVoucherId,
                    type: 'eligible',
                  })
                }
                type="eligible"
              />
            </View>
          )}
          {eligibleVouchers &&
            eligibleVouchers
              .filter((voucher) => voucher.id !== props.selectedVoucher?.id)
              .map((voucher) => {
                const subtitle = getSubtitle(voucher.remainingDay);

                return (
                  <View
                    key={`${voucher.sinbadVoucherId}-${voucher.id}`}
                    style={VoucherCartListStyles.cardContainer}>
                    <VoucherCard
                      name="Sinbad"
                      title={voucher.name}
                      subtitle={subtitle}
                      value={voucher.sinbadVoucherId}
                      onPress={() =>
                        NavigationAction.navigate('VoucherDetailView', {
                          id: voucher.sinbadVoucherId,
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
              const subtitle = getSubtitle(voucher.remainingDay);
              const currency = toCurrency(voucher.minOrderTransaction, {
                withFraction: false,
              });
              const helperText = `Min. pembelian ${currency}`;

              return (
                <View
                  key={`${voucher.sinbadVoucherId}-${voucher.id}`}
                  style={VoucherCartListStyles.cardContainer}>
                  <VoucherCard
                    name="Sinbad"
                    title={voucher.name}
                    subtitle={subtitle}
                    value={voucher.sinbadVoucherId}
                    onPress={() =>
                      NavigationAction.navigate('VoucherDetailView', {
                        id: voucher.sinbadVoucherId,
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
