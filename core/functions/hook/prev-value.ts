/** === IMPORT PACKAGE HERE === */
import React from 'react';
/** === FUNCTION === */
const usePrevious = (value: any) => {
  const ref = React.useRef(0);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
/** === EXPORT === */
export { usePrevious };
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
