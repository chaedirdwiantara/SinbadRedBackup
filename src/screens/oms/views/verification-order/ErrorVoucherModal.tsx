/** === IMPORT PACKAGES ===  */
import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { SnbBottomSheet, SnbText, SnbButton } from 'react-native-sinbad-ui';
/** === IMPORT TYPE ===  */
import * as models from '@models';
/** === IMPORT ASSETS === */
import { Images } from 'src/assets';
/** === TYPE ===  */
interface ErrorVoucherModal {
  visible: boolean;
  onBackToCart: () => void;
}
/** === COMPONENT ===  */
export const ErrorVoucherModal: FC<ErrorVoucherModal> = ({
  visible,
  onBackToCart,
}) => {
  /** => render bottom action */
  const renderBottomAction = () => {
    return (
      <View style={{ height: 150 }}>
        <SnbButton.Single
          testID={''}
          title={'Kembali Ke Keranjang'}
          onPress={onBackToCart}
          type={'primary'}
        />
      </View>
    );
  };
  return (
    <SnbBottomSheet
      open={visible}
      content={
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Images.emptyVoucher}
              style={{ width: 177, height: 156, marginBottom: 12 }}
            />
            <SnbText.H3>Voucher Tidak Valid</SnbText.H3>
            <View style={{ marginTop: 4, marginBottom: 12 }}>
              <SnbText.B3>
                Maaf voucher tidak dapat digunakan karena terdapat perubahan
                ketentuan batas pembelian
              </SnbText.B3>
            </View>
          </View>
          {renderBottomAction()}
        </View>
      }
    />
  );
};
