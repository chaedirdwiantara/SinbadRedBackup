import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
import * as models from '@models';
interface ModalBottomErrorInvoiceProps {
  data?: models.ErrorProps;
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
export const ModalBottomErrorInvoice: FC<ModalBottomErrorInvoiceProps> = ({
  isOpen,
  close,
  data,
}) => {
  return (
    <BottomModalError
      isOpen={isOpen}
      errorTitle={'Terjadi kesalahan'}
      errorSubtitle={data?.errorMessage || 'Silahkan mencoba kembali'}
      errorImage={require('../../../../assets/images/cry_sinbad.png')}
      buttonTitle={'Ok'}
      buttonOnPress={() => {
        close();
      }}
    />
  );
};

export default ModalBottomErrorInvoice;
