import { FooterButton } from '@sinbad/react-native-sinbad-ui';
import React, { FC } from 'react';

interface VoucherDetailFooterProps {
  loading: boolean;
  disabled: boolean;
  onPress: () => void;
}

export const VoucherDetailFooter: FC<VoucherDetailFooterProps> = ({
  loading,
  disabled,
  onPress,
}) => {
  return (
    <FooterButton.Single
      title="Pakai Voucher"
      loading={loading}
      loadingButton={loading}
      disabled={disabled}
      buttonPress={onPress}
    />
  );
};
