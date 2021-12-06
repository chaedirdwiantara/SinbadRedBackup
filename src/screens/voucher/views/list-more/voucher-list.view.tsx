/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View } from 'react-native';
import { SnbIcon, SnbText, color } from 'react-native-sinbad-ui';
import { VoucherCartListStyles } from '../../styles';
import { SinbadVoucherCard } from '../../components/SinbadVoucherCard';
import { SellerVoucherCard } from '../../components/SellerVoucherCard';
import * as models from '@models';
/** === INTERFACE === */
interface VoucherListProps {
  voucherListData: any;
  voucherGroupName: string;
  voucherGroupType: string;
  selectedSinbadVoucher: models.SinbadVoucherProps | null;
  selectedSellerVoucher: models.SellerVoucherListProps[];
  setSelectedSinbadVoucher: (item: models.SinbadVoucherProps) => void;
  setSelectedSellerVoucher: (item: models.SellerVoucherListProps[]) => void;
}
/** === COMPONENT ===  */
export const VoucherList: FC<VoucherListProps> = ({
  voucherListData,
  voucherGroupName,
  voucherGroupType,
  selectedSinbadVoucher,
  selectedSellerVoucher,
  setSelectedSinbadVoucher,
  setSelectedSellerVoucher,
}) => (
  <View style={VoucherCartListStyles.voucherSection}>
    <View style={VoucherCartListStyles.voucherSectionHeader}>
      <View style={VoucherCartListStyles.voucherSectionTitle}>
        <SnbIcon name={'local_offer'} color={color.green50} size={24} />
        <View style={VoucherCartListStyles.voucherSectionTitleTextContainer}>
          <SnbText.H4 color={color.black80}>{voucherGroupName}</SnbText.H4>
          <SnbText.C2 color={color.black60}>
            {`${voucherListData.length} Voucher Tersedia`}
          </SnbText.C2>
        </View>
      </View>
    </View>
    {voucherGroupType === 'sinbad_voucher' ? (
      <SinbadVoucherCard
        voucherList={voucherListData}
        selectedSinbadVoucher={selectedSinbadVoucher}
        setSelectedSinbadVoucher={setSelectedSinbadVoucher}
        isListMore
      />
    ) : (
      <SellerVoucherCard
        voucherList={voucherListData}
        selectedSellerVoucher={selectedSellerVoucher}
        setSelectedSellerVoucher={setSelectedSellerVoucher}
        isListMore
      />
    )}
  </View>
);
