/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { VoucherCartListStyles } from '../styles';
import { goToVoucherDetail } from '../functions';
import * as models from '@models';
import SvgIcon from '@svg';
/** === INTERFACE === */
interface SinbadVoucherCardProps {
  voucherList: models.SinbadVoucherProps[];
  selectedSinbadVoucher: models.SinbadVoucherProps | null;
  setSelectedSinbadVoucher: (item: models.SinbadVoucherProps) => void;
  isListMore?: boolean;
}
/** === COMPONENT ===  */
export const SinbadVoucherCard: FC<SinbadVoucherCardProps> = ({
  voucherList,
  selectedSinbadVoucher,
  setSelectedSinbadVoucher,
  isListMore,
}) => {
  return (
    <React.Fragment>
      {voucherList.map((item, index) => {
        if (index < 3 || isListMore) {
          const isIdActive =
            selectedSinbadVoucher?.voucherId === item.voucherId;
          return (
            <TouchableOpacity
              testID={`voucherCartListView.sinbadVoucherCardTouchable${index}`}
              key={index}
              style={VoucherCartListStyles.voucherCard}
              onPress={() => setSelectedSinbadVoucher(item)}>
              <View style={VoucherCartListStyles.voucherCardLeftContent}>
                <View style={{ marginBottom: 8 }}>
                  <SnbText.B4>{item.voucherName}</SnbText.B4>
                </View>
                <View style={{ marginBottom: 8 }}>
                  <SnbText.C2 color={color.black80}>
                    {item.shortDescription}
                  </SnbText.C2>
                </View>
                <SnbText.C1 color={color.black80}>
                  {`Berakhir dalam ${item.remainingDay} hari lagi!`}
                </SnbText.C1>
              </View>
              <View style={VoucherCartListStyles.voucherCardRightContent}>
                <SvgIcon
                  name={isIdActive ? 'selected_voucher' : 'unselect_voucher'}
                  size={24}
                />
                <TouchableOpacity
                  testID={`voucherCartListView.sinbadVoucherDetailTouchable${index}`}
                  onPress={() => goToVoucherDetail(item.voucherId, 'sinbad')}>
                  <SnbText.B2 color={color.green50}>Lihat Detail</SnbText.B2>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }
      })}
    </React.Fragment>
  );
};
