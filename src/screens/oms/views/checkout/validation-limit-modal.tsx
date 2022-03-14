import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
interface CheckoutBottomErrorModalProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
export const ModalValidationLimit: FC<CheckoutBottomErrorModalProps> = ({
  isOpen,
  close,
}) => {
  return (
    <BottomModalError
      isOpen={isOpen}
      errorTitle={'Total pembelian terlalu besar'}
      errorSubtitle={
        'Coba kurangi produk di keranjang Anda hingga di bawah Rp999.999.999.'
      }
      errorImage={require('../../../../assets/images/expired_time.png')}
      buttonTitle={'Kembali Ke Keranjang'}
      buttonOnPress={() => {
        close();
      }}
    />
  );
};

export default ModalValidationLimit;
