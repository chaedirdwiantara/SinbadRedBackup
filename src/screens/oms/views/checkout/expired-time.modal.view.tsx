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
      errorTitle={'Terjadi kesalahan'}
      errorSubtitle={
        'Sesi checkout Anda sudah habis. Silakan ulangi proses checkout Anda.'
      }
      errorImage={require('../../../../assets/images/cry_sinbad.png')}
      buttonTitle={'Ok'}
      buttonOnPress={() => {
        close();
      }}
    />
  );
};

export default ModalBottomErrorExpiredTime;
