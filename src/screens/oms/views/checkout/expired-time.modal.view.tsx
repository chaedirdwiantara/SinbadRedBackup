import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
interface CheckoutBottomErrorModalProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
export const ModalBottomErrorExpiredTime: FC<CheckoutBottomErrorModalProps> = ({
  isOpen,
  close,
}) => {
  return (
    <BottomModalError
      isOpen={isOpen}
      errorTitle={'Batas waktu pemesanan habis'}
      errorSubtitle={
        'Silahkan ulangi proses pemesanan dan selesaikan kurang dari 5 menit.'
      }
      errorImage={require('../../../../assets/images/expired_time.png')}
      buttonTitle={'Ok'}
      buttonOnPress={() => {
        close();
      }}
    />
  );
};

export default ModalBottomErrorExpiredTime;
