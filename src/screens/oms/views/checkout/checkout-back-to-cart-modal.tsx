/** === IMPORT PACKAGE HERE ===  */
import React, { FC } from 'react';
import { SnbDialog } from 'react-native-sinbad-ui';

interface BackToCartModalProps {
  isOpen: boolean;
  handleOkAction: () => void;
  handleNoAction: () => void;
}
/** === COMPONENT === */
export const BackToCartModal: FC<BackToCartModalProps> = ({
  isOpen,
  handleOkAction,
  handleNoAction,
}) => {
  return (
    <SnbDialog
      open={isOpen}
      title="Konfirmasi"
      content="Apakah anda ingin membatalkan pesanan?"
      ok={handleOkAction}
      cancel={handleNoAction}
      okText="Ya"
      cancelText="Tidak"
    />
  );
};

/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: Ryan (voyager)
 * createDate: 30112021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
