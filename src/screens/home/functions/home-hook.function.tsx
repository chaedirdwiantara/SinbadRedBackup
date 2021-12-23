/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { NavigationAction } from '@navigation';
/** === FUNCTION === */
/** => header */
const useHeaderChange = () => {
  const [headerChange, setheaderChange] = React.useState<boolean>(false);
  return {
    stateHeaderChange: headerChange,
    actionHeaderChange: (data: boolean) => {
      if (data !== headerChange) {
        setheaderChange(data);
      }
    },
  };
};
/** => refresh */
const useRefresh = () => {
  const [refresh, setRefresh] = React.useState<boolean>(false);
  return {
    stateRefresh: refresh,
    actionRefresh: (data: boolean) => {
      if (data !== refresh) {
        setRefresh(data);
      }
      NavigationAction.resetToHome();
    },
  };
};
/** === EXPORT === */
export { useHeaderChange, useRefresh };
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
