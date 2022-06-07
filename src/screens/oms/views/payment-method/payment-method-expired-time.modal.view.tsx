import PaymentMethodModal from '@screen/oms/components/payment-method-modal';
import React, { FC } from 'react';
interface PaymentMethodExpiredTimeModalProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */

export const PaymentMethodExpiredTimeModal: FC<
  PaymentMethodExpiredTimeModalProps
> = ({ isOpen, close }) => {
  return (
    <PaymentMethodModal
      buttonType="single"
      open={isOpen}
      close={() => close()}
      name="modal-expired-time"
      snbButtonTitle="expired-time"
      illustrationTitle="Batas Waktu Pemesanan Habis"
      footerButtonTitle="Kembali ke Keranjang"
      footerButtonTitle2=""
      image={require('../../../../assets/images/expired_time.png')}
      description="Silakan ulangi proses pemesanan dan selesaikan kurang dari 5 menit."
      onPressLeft={() => {}}
      onPressRight={() => {}}
    />
  );
};

export default PaymentMethodExpiredTimeModal;
