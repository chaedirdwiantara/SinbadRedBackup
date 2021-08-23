/** === IMPORT PACKAGE HERE === */
import { useState } from 'react';
/** === FUNCTION === */
const useHeaderChange = () => {
  const [headerChange, setheaderChange] = useState<boolean>(false);
  return {
    state: headerChange,
    action: (data: boolean) => {
      if (data !== headerChange) {
        setheaderChange(data);
      }
    },
  };
};
/** === EXPORT === */
export const HomeHookFunc = { useHeaderChange };
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
