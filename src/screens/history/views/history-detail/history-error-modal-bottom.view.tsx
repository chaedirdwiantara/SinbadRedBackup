import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
import * as models from '@models';
interface ModalBottomErrorInvoiceProps {
  data?: models.ErrorProps;
  isOpen: boolean;
  title?: string;
  close: () => void;
}
/** === COMPONENT === */
export const ModalBottomError: FC<ModalBottomErrorInvoiceProps> = ({
  isOpen,
  close,
  data,
  title,
}) => {
  return (
    <BottomModalError
      isOpen={isOpen}
      errorTitle={title ?? 'Terjadi Kesalahan'}
      errorSubtitle={data?.errorMessage || 'Silahkan mencoba kembali'}
      errorImage={require('../../../../assets/images/cry_sinbad.png')}
      buttonTitle={'Ok'}
      buttonOnPress={() => {
        close();
      }}
    />
  );
};

export default ModalBottomError;
