/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbIcon, SnbText, color } from 'react-native-sinbad-ui';
import { VoucherCartListStyles } from '../../styles';
import { goToVoucherCartListMore } from '../../functions';
import { SinbadVoucherCard } from '../../components/SinbadVoucherCard';
import * as models from '@models';
/** === INTERFACE === */
interface SinbadVoucherListProps {
  sinbadVoucher: models.SinbadVoucherProps[];
  selectedSellerVoucher: models.SellerVoucherListProps[];
  selectedSinbadVoucher: models.SinbadVoucherProps | null;
  setSelectedSinbadVoucher: (item: models.SinbadVoucherProps) => void;
}
/** === COMPONENT ===  */
export const SinbadVoucherList: FC<SinbadVoucherListProps> = ({
  sinbadVoucher,
  selectedSellerVoucher,
  selectedSinbadVoucher,
  setSelectedSinbadVoucher,
}) => (
  <View style={VoucherCartListStyles.voucherSection}>
    <View style={VoucherCartListStyles.voucherSectionHeader}>
      <View style={VoucherCartListStyles.voucherSectionTitle}>
        <SnbIcon name={'local_offer'} color={color.green50} size={24} />
        <View style={VoucherCartListStyles.voucherSectionTitleTextContainer}>
          <SnbText.H4 color={color.black80}>Sinbad Voucher</SnbText.H4>
          <SnbText.C2 color={color.black60}>
            {`${sinbadVoucher.length} Voucher Tersedia`}
          </SnbText.C2>
        </View>
      </View>
      {sinbadVoucher.length > 3 ? (
        <TouchableOpacity
          testID={'voucherCartListView.sinbadVoucherSeeMore'}
          style={VoucherCartListStyles.voucherSectionRightIcon}
          onPress={() =>
            goToVoucherCartListMore({
              voucherList: sinbadVoucher,
              voucherGroupName: 'Sinbad Voucher',
              voucherGroupType: 'sinbad_voucher',
              selectedSellerVoucher,
              selectedSinbadVoucher,
            })
          }>
          <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
          <SnbIcon name={'chevron_right'} color={color.red50} size={24} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
    <SinbadVoucherCard
      voucherList={sinbadVoucher}
      selectedSinbadVoucher={selectedSinbadVoucher}
      setSelectedSinbadVoucher={setSelectedSinbadVoucher}
    />
  </View>
);
