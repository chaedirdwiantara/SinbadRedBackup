/** === IMPORT PACKAGE HERE === */
import { useState } from 'react';
/** === IMPORT PACKAGE HERE === */
import { useSelector } from 'react-redux';
/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { RootState } from '@reducers';
import * as models from '@models';
import * as Actions from '@actions';
/** === FUNCTION === */
/** => collect data */
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
const useOldPassword = () => {
  const [dataOldPassword, setDataOldPassword] = useState<string>('');
  return {
    dataOldPassword: dataOldPassword,
    setDataOldPassword: (data: string) => {
      if (data !== dataOldPassword) {
        setDataOldPassword(data);
      }
    },
  };
};
const useNewPassword = () => {
  const [dataNewPassword, setDataNewPassword] = useState<string>('');
  return {
    dataNewPassword: dataNewPassword,
    setDataNewPassword: (data: string) => {
      if (data !== dataNewPassword) {
        setDataNewPassword(data);
      }
    },
  };
};
const useConfirmNewPassword = () => {
  const [dataConfirmNewPassword, setDataConfirmNewPassword] =
    useState<string>('');
  return {
    dataConfirmNewPassword: dataConfirmNewPassword,
    setDataConfirmNewPassword: (data: string) => {
      if (data !== dataConfirmNewPassword) {
        setDataConfirmNewPassword(data);
      }
    },
  };
};
/** => call detail action */
const useStoreDetailAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (
      contextDispatch: (action: any) => any,
      data: models.DetailProcessProps,
    ) => {
      dispatch(Actions.storeDetailProcess(contextDispatch, data));
    },
  };
};
/** => change password */
const useChangePassword = () => {
  const dispatch = useDispatch();
  return {
    changePassword: (
      contextDispatch: (action: any) => any,
      data: models.UpdateProcessProps<{}>,
    ) => {
      dispatch(Actions.changePasswordProcess(contextDispatch, data));
    },
  };
};
/** === EXPORT === */
export const UserHookFunc = {
  useUserData,
  useBadgeInformation,
  useOldPassword,
  useNewPassword,
  useConfirmNewPassword,
  useStoreDetailAction,
  useChangePassword,
};
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
