/** === IMPORT PACKAGE HERE === */
import React from 'react';
/** === FUNCTION === */
/** => set voucher tnc & instruction modal */
const useVoucherListItemModal = () => {
  const [isTncModalOpen, setTncModalOpen] = React.useState(false);
  const [isInstructionModalOpen, setInstructionModalOpen] =
    React.useState(false);
  return {
    handleOpenTncModal: () => {
      setTncModalOpen(true);
    },
    handleCloseTnCModal: () => {
      setTncModalOpen(false);
    },
    handleOpenInstructionModal: () => {
      setInstructionModalOpen(true);
    },
    handleCloseInstructionModal: () => {
      setInstructionModalOpen(false);
    },
    isTncModalOpen,
    isInstructionModalOpen,
  };
};
/** === EXPORT === */
export { useVoucherListItemModal };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (team)
 * createDate: 15092021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
