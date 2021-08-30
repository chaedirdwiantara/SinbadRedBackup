/** === IMPORT PACKAGE HERE === */
import { useState } from 'react';
/** === IMPORT PACKAGE HERE === */
import { useSelector } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { RootState } from '@reducers';
import * as models from '@models';
/** === FUNCTION === */
/** => collect data */
/** brand */
const useUserData = () => {
  const data: models.UserProps = useSelector(
    (state: RootState) => state.permanent.user,
  );
  return data;
};
const useBadgeInformation = () => {
  const [showBadge, setShowBadge] = useState<boolean>(true);
  return {
    state: showBadge,
    action: (data: boolean) => {
      if (data !== showBadge) {
        setShowBadge(data);
      }
    },
  };
};
/** === EXPORT === */
export const UserHookFunc = { useUserData, useBadgeInformation };
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
