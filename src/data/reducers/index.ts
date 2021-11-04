/**
 * ============================================================
 * REGISTER ALL REDUCERS HERE
 * ============================================================
 */
import { combineReducers } from 'redux';
import { flagRTDB } from '@core/data/reducers/flag-rtdb/flag-rtdb.reducer';
import { permanent } from './permanent';
import { auth } from './auth';
import { global } from './global';
import { voucher } from './voucher/voucher-local-data.reducer';

export const rootReducer = combineReducers({
  permanent,
  flagRTDB,
  auth,
  global,
  voucher,
});

export type RootState = ReturnType<typeof rootReducer>;
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
