/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbIcon, SnbText, color } from 'react-native-sinbad-ui';
import { VoucherCartListStyles } from '../../styles';
import { goToVoucherCartListMore } from '../../functions';
import { camelize } from '@core/functions/global/camelize';
import { SellerVoucherCard } from '../../components/SellerVoucherCard';
import * as models from '@models';
/** === INTERFACE === */
interface SellerVoucherListProps {
  sellerVoucher: models.SellerVoucherProps[];
  selectedSellerVoucher: models.SellerVoucherListProps[];
  selectedSinbadVoucher: models.SinbadVoucherProps | null;
  setSelectedSellerVoucher: (item: models.SellerVoucherListProps[]) => void;
}
/** === COMPONENT ===  */
export const SellerVoucherList: FC<SellerVoucherListProps> = ({
  sellerVoucher,
  selectedSellerVoucher,
  selectedSinbadVoucher,
  setSelectedSellerVoucher,
}) => {
  return (
    <React.Fragment>
      {sellerVoucher.map((item, index) => {
        return (
          <View key={index} style={VoucherCartListStyles.voucherSection}>
            <View style={VoucherCartListStyles.voucherSectionHeader}>
              <View style={VoucherCartListStyles.voucherSectionTitle}>
                <SnbIcon name={'local_offer'} color={color.green50} size={24} />
                <View
                  style={
                    VoucherCartListStyles.voucherSectionTitleTextContainer
                  }>
                  <SnbText.H4 color={color.black80}>
                    {item.invoiceGroupName}
                  </SnbText.H4>
                  <SnbText.C2 color={color.black60}>
                    {`${item.voucherList.length} Voucher Tersedia`}
                  </SnbText.C2>
                </View>
              </View>
              {item.voucherList.length > 3 ? (
                <TouchableOpacity
                  testID={`voucherCartListView.${camelize(
                    item.invoiceGroupName,
                  )}SeeMore`}
                  style={VoucherCartListStyles.voucherSectionRightIcon}
                  onPress={() =>
                    goToVoucherCartListMore({
                      voucherList: item.voucherList,
                      voucherGroupName: item.invoiceGroupName,
                      voucherGroupType: 'seller_voucher',
                      selectedSellerVoucher: selectedSellerVoucher,
                      selectedSinbadVoucher: selectedSinbadVoucher,
                    })
                  }>
                  <SnbText.B2 color={color.red50}>Lihat Semua</SnbText.B2>
                  <SnbIcon
                    name={'chevron_right'}
                    color={color.red50}
                    size={24}
                  />
                </TouchableOpacity>
              ) : (
                <View />
              )}
            </View>
            <SellerVoucherCard
              voucherList={item.voucherList}
              selectedSellerVoucher={selectedSellerVoucher}
              setSelectedSellerVoucher={setSelectedSellerVoucher}
            />
          </View>
        );
      })}
    </React.Fragment>
  );
};
