import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
import PaymentMethodModal from '@screen/oms/components/payment-method-modal';
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
    <PaymentMethodModal
      buttonType="single"
      open={isOpen}
      close={() => close()}
      name="modal-error"
      snbButtonTitle="modal-error"
      illustrationTitle="Terjadi Kendala di Sinbad"
      footerButtonTitle="Coba Lagi"
      footerButtonTitle2=""
      image={require('../../../../assets/images/sinbad/no-connection.png')}
      description="Sedang terjadi kendala dalam sistem kami, coba ulangi beberapa saat lagi"
      onPressLeft={() => {}}
      onPressRight={() => {}}
    />
  );
};

export default PaymentMethodErrorModal;
