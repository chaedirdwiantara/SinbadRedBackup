/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, SnbIcon, color, SnbDivider } from 'react-native-sinbad-ui';
import { toCurrency } from '../../../../../core/functions/global/currency-format';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { contexts } from '@contexts';
import { useCountAllVoucherAction } from '@screen/voucher/functions/voucher-hook.function';
import { goToVoucherCartList } from '../../functions';
import { countPotentialDiscount } from '@screen/voucher/functions';
import { ShoppingCartStyles } from '../../styles';
import { useDataVoucher } from '@core/redux/Data';
import { useShopingCartContext } from 'src/data/contexts/oms/shoping-cart/useShopingCartContext';
/** === COMPONENT === */
export const ShoppingCartVoucherTag: FC = () => {
  /** Cart Data */
  const {
    stateShopingCart: { cart: cartState },
  } = useShopingCartContext();
  /** Voucher Cart */
  const { count } = useCountAllVoucherAction();
  const { stateVoucher, dispatchVoucher } = React.useContext(
    contexts.VoucherContext,
  );
  const voucherData = useDataVoucher();
  React.useEffect(() => {
    if (cartState.data !== null) {
      count(dispatchVoucher);
    }
  }, [cartState]);

  const { countVoucher } = stateVoucher;

  return (
    <React.Fragment>
      {countVoucher.detail.data?.total !== 0 &&
        countVoucher.detail.loading !== true && (
          <View>
            <TouchableOpacity
              onPress={() => goToVoucherCartList()}
              style={ShoppingCartStyles.voucherTagContainer}>
              <View style={ShoppingCartStyles.voucherTagLeftContainer}>
                <View style={ShoppingCartStyles.voucherTagIconContainer}>
                  <SnbIcon name={'local_offer'} size={16} color={color.white} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                  {voucherData.dataVouchers !== null ? (
                    <>
                      <SnbText.C1
                        color={color.green50}>{`Potensi potongan ${toCurrency(
                        countPotentialDiscount(
                          voucherData.dataVouchers.sinbadVoucher,
                          voucherData.dataVouchers.sellerVouchers,
                        ).totalDiscount,
                        {
                          withPrefix: false,
                          withFraction: false,
                        },
                      )}`}</SnbText.C1>
                      <SnbText.C2 color={color.green50}>{`${
                        countPotentialDiscount(
                          voucherData.dataVouchers.sinbadVoucher,
                          voucherData.dataVouchers.sellerVouchers,
                        ).totalSelectedVoucher
                      } Voucher terpilih`}</SnbText.C2>
                    </>
                  ) : (
                    <SnbText.B3
                      color={
                        color.green50
                      }>{`Anda memiliki ${stateVoucher.countVoucher.detail.data?.total} voucher`}</SnbText.B3>
                  )}
                </View>
              </View>
              <View style={ShoppingCartStyles.voucherTagRightContainer}>
                <SnbText.B2 color={color.red50}>
                  {voucherData.dataVouchers !== null
                    ? 'Ganti Voucher'
                    : 'Lihat Semua'}
                </SnbText.B2>
                <SnbIcon name={'chevron_right'} size={24} color={color.red50} />
              </View>
            </TouchableOpacity>
            <SnbDivider />
          </View>
        )}
    </React.Fragment>
  );
};
