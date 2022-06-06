import PaymentMethodModal from '@screen/oms/components/payment-method-modal';
import React, { FC } from 'react';
import {
  SnbBottomSheet2,
  SnbBottomSheetPart,
  Content,
  FooterButton,
} from 'react-native-sinbad-ui';
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
      open={isOpen}
      close={() => close()}
      name="modal-expired-time"
      snbButtonTitle="expired-time"
      illustrationTitle="Batas waktu pemesanan habis"
      footerButtonTitle="Kembali ke Keranjang"
      image={require('../../../../assets/images/expired_time.png')}
      description="Silahkan ulangi proses pemesanan dan selesaikan kurang dari 5 menit."
    />
  );
};

export default PaymentMethodExpiredTimeModal;
