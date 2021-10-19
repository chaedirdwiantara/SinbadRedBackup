/** === IMPORT PACKAGE HERE === */
import React from 'react';
/** === IMPORT EXTERNAL FUNCTION HERE === */
/** === FUNCTION === */
/** => terms and conditions modal */
const useCallCsModal = () => {
  const [isOpen, setOpen] = React.useState(false);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    isOpen,
  };
};
/** === EXPORT === */
export { useCallCsModal };
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: bagas (team)
 * createDate: 18102021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
