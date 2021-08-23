/** === IMPORT PACKAGE HERE === */
import { useState } from 'react';
/** === FUNCTION === */
const useModalConfirmation = () => {
  const [modalConfirmation, setModalConfirmation] = useState(false);
  return {
    state: modalConfirmation,
    action: (data: boolean) => {
      setModalConfirmation(data);
    },
  };
};
/** === EXPORT === */
export const OmsHookFunc = { useModalConfirmation };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
