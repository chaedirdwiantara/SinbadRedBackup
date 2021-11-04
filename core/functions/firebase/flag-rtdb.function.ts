/** === IMPORT PACKAGE HERE === */
import React from 'react';
import database from '@react-native-firebase/database';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as CoreAction from '../../data/actions';
import { uniqueId } from '../global/device-data';
/** === FUNCTION === */
/** => set flag by device id */
const setFlagByDeviceId = async () => {
  const deviceId = database().ref('sinbadApp');
  deviceId.child(uniqueId).once('value', (data) => {
    if (data.val() === null) {
      deviceId.child(uniqueId).child('flag').set({ isFlagActive: true });
    }
  });
};
/** check data flag */
const useCheckFlagByTask = async (task: string) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const flag = database()
      .ref(`sinbadApp/${uniqueId}/flag/${task}`)
      .on('value', (data) => {
        dispatch(CoreAction.isFlagChange({ key: task, value: data.val() }));
      });
    return () =>
      database().ref(`sinbadApp/${uniqueId}/flag/${task}`).off('value', flag);
  }, []);
};
/** === EXPORT === */
export { setFlagByDeviceId, useCheckFlagByTask };
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
