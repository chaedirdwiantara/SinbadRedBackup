import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
interface PaymentMethodExpiredTimeModalProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
export const PaymentMethodExpiredTimeModal: FC<
  PaymentMethodExpiredTimeModalProps
> = ({ isOpen, close }) => {
  return (
    <BottomModalError
      isOpen={isOpen}
      errorTitle={'Batas waktu pemesanan habis'}
      errorSubtitle={
        'Silahkan ulangi proses pemesanan dan selesaikan kurang dari 5 menit.'
      }
      errorImage={require('../../../../assets/images/expired_time.png')}
      buttonTitle={'Kembali ke Keranjang'}
      buttonOnPress={() => {
        close();
      }}
    />
  );
};

export default PaymentMethodExpiredTimeModal;
