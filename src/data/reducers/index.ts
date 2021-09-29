/**
 * ============================================================
 * REGISTER ALL REDUCERS HERE
 * ============================================================
 */
import { combineReducers } from 'redux';
import { permanent } from './permanent';
import { voucher } from './voucher/voucher/voucher-data.reducer';

export const rootReducer = combineReducers({
  permanent,
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
