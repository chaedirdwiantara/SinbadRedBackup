/**
 * ============================================================
 * REGISTER ALL REDUCERS HERE
 * ============================================================
 */
import { combineReducers } from 'redux';
import { flagRTDB } from './flag-rtdb/flag-rtdb.reducer';
import { updateApp } from './update-app/update-app.reducer';
import { notificationQuit } from './is-notification/is-notification.reducer';

export const globalCore = combineReducers({
  flagRTDB,
  updateApp,
  notificationQuit,
});
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
