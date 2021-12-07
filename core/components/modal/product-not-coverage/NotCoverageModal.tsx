import React, { FC } from 'react';
import BottomModalError from '@core/components/BottomModalError';
const sinbadCry = require('@image/sinbad_image/cry_sinbad.png');

interface ProductNotCoverageModalProps {
  isOpen: boolean;
  close: () => void;
}
/** === COMPONENT === */
const ProductNotCoverageModal: FC<ProductNotCoverageModalProps> = ({
  isOpen,
  close,
}) => {
  return (
    <BottomModalError
      isOpen={isOpen}
      errorTitle={'SKU Tidak Tersedia'}
      errorSubtitle={'SKU tidak tersedia di lokasi anda'}
      errorImage={sinbadCry}
      buttonTitle={'Ok'}
      buttonOnPress={() => {
        close();
      }}
    />
  );
};

export default ProductNotCoverageModal;
