/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
/** === FUNCTION === */
/** => voucher cart list action */
const useVoucherDetailAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.voucherDetailProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.voucherDetailReset());
    },
  };
};
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
export { useVoucherListItemModal, useVoucherDetailAction };
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
