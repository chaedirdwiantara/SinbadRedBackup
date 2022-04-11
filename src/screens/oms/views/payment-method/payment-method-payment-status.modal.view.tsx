/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { SnbBottomSheet, SnbText, SnbButton } from 'react-native-sinbad-ui';
import { PaymentMethodStyle } from '@screen/oms/styles';

interface PaymentStatusModal {
  isOpen: boolean;
  handleOkAction: () => void;
  handleNoAction: () => void;
}
/** === COMPONENT === */
export const PaymentStatusModal: FC<PaymentStatusModal> = ({
  isOpen,
  handleOkAction,
  handleNoAction,
}) => {
  /** => ACTION */
  const button = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}>
        <SnbButton.Multiple
          rightTitle={'Lanjutkan'}
          leftTitle={'Ganti Metode'}
          leftType={'secondary'}
          rightType={'primary'}
          onPressLeft={handleNoAction}
          onPressRight={handleOkAction}
        />
      </View>
    );
  };

  const content = () => {
    return (
      <>
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 60,
          }}>
          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <View style={PaymentMethodStyle.paymentStatusItem}>
              <Image
                source={require('../../../../assets/images/pending-payment.png')}
                style={{ height: 150, width: 150 }}
              />
            </View>
            <View style={PaymentMethodStyle.paymentStatusItem}>
              <SnbText.H3>Transaksi sebelumnya belum dibayar</SnbText.H3>
            </View>
            <View style={PaymentMethodStyle.paymentStatusItem}>
              <SnbText.B1 align="center">
                Pesanan ini akan diproses dengan nomor virtual account baru.
                Anda tetap bisa melanjutkan pembayaran untuk masing-masing
                pesanan.
              </SnbText.B1>
            </View>
          </View>
        </View>
        {button()}
      </>
    );
  };

  return <SnbBottomSheet open={isOpen} content={content()} size={'normal'} />;
};
