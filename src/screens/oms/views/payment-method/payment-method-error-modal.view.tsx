import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
interface PaymentMethodErrorProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
export const PaymentMethodErrorModal: FC<PaymentMethodErrorProps> = ({
  isOpen,
  close,
}) => {
  return (
    <BottomModalError
      isOpen={isOpen}
      errorTitle={'Terjadi Kesalahan'}
      errorSubtitle={'Sepertinya terdapat sedikit gangguan pada server sinbad'}
      errorImage={require('../../../../assets/images/sinbad/no-connection.png')}
      buttonTitle={'Kembali ke Keranjang'}
      buttonOnPress={() => {
        close();
      }}
    />
  );
};

export default PaymentMethodErrorModal;
