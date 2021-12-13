import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
interface CheckoutBottomErrorModalProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
export const ModalBottomErrorCheckout: FC<CheckoutBottomErrorModalProps> = ({
  isOpen,
  close,
}) => {
  return (
    <BottomModalError
      isOpen={isOpen}
      errorTitle={'Terjadi kesalahan'}
      errorSubtitle={'Silahkan mencoba kembali'}
      errorImage={require('../../../../assets/images/cry_sinbad.png')}
      buttonTitle={'Ok'}
      buttonOnPress={() => {
        close();
      }}
    />
  );
};

export default ModalBottomErrorCheckout;
