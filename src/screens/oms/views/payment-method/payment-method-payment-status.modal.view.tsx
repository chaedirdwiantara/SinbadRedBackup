/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { SnbBottomSheet, SnbText, SnbButton } from 'react-native-sinbad-ui';
import { PaymentMethodStyle } from '@screen/oms/styles';
import PaymentMethodModal from '@screen/oms/components/payment-method-modal';

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
  return (
    <PaymentMethodModal
      buttonType="dual"
      open={isOpen}
      close={() => handleNoAction()}
      name="modal-payment-status"
      snbButtonTitle="payment-status"
      illustrationTitle="Transaksi sebelumnya belum dibayar"
      footerButtonTitle="Lanjutkan"
      footerButtonTitle2="Ganti Metode"
      image={require('../../../../assets/images/pending-payment.png')}
      description="Pesanan ini akan diproses dengan nomor virtual account baru.
      Anda tetap bisa melanjutkan pembayaran untuk masing-masing
      pesanan."
      onPressLeft={() => handleNoAction()}
      onPressRight={() => handleOkAction()}
    />
  );
};
