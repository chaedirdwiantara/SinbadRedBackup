/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SnbText, color } from 'react-native-sinbad-ui';
import { VoucherCartListStyles } from '../styles';
import { goToVoucherDetail } from '../functions';
import * as models from '@models';
import SvgIcon from '@svg';
import { camelize } from '@core/functions/global/camelize';
/** === INTERFACE === */
interface SellerVoucherCardProps {
  voucherList: models.SellerVoucherListProps[];
  selectedSellerVoucher: models.SellerVoucherListProps[];
  setSelectedSellerVoucher: (item: models.SellerVoucherListProps[]) => void;
  isListMore?: boolean;
}
/** === COMPONENT ===  */
export const SellerVoucherCard: FC<SellerVoucherCardProps> = ({
  voucherList,
  selectedSellerVoucher,
  setSelectedSellerVoucher,
  isListMore,
}) => {
  return (
    <React.Fragment>
      {voucherList.map((item, index) => {
        if (index < 3 || isListMore) {
          const isIdActive = selectedSellerVoucher.some(
            (element) => element.id === item.id,
          );
          const isInvoiceGroupIdActive = selectedSellerVoucher.some(
            (element) => element.invoiceGroupId === item.invoiceGroupId,
          );
          return (
            <TouchableOpacity
              testID={`voucherCartListView.${camelize(
                item.invoiceGroupName,
              )}CardTouchable${index}`}
              key={index}
              style={VoucherCartListStyles.voucherCard}
              onPress={() => {
                if (isInvoiceGroupIdActive) {
                  if (!isIdActive) {
                    const tempArray = selectedSellerVoucher.filter(
                      (element) => {
                        return item.invoiceGroupId !== element.invoiceGroupId;
                      },
                    );
                    tempArray.push(item);
                    setSelectedSellerVoucher(tempArray);
                  }
                } else {
                  const tempArray = [...selectedSellerVoucher];
                  tempArray.push(item);
                  setSelectedSellerVoucher(tempArray);
                }
              }}>
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
                  testID={`voucherCartListView.${camelize(
                    item.invoiceGroupName,
                  )}DetailTouchable${index}`}
                  onPress={() => goToVoucherDetail(item.voucherId, 'seller')}>
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
