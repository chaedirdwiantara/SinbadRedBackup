import { SnbTopNav2 } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';

interface VoucherCartHeaderProps {
  goBack: () => void;
}

export const VoucherCartHeader: FC<VoucherCartHeaderProps> = ({ goBack }) => {
  return (
    <SnbTopNav2.Type3
      title={'Pakai Voucher'}
      color={'white'}
      backAction={() => goBack()}
    />
  );
};
