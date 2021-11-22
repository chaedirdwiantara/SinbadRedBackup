/**
 * ============================================================
 * REGISTER ALL REDUCERS HERE
 * ============================================================
 */
import { combineReducers } from 'redux';
import {
  globalCore,
  permanentCore,
  authCore,
  cartSelectedCore,
} from '@core/data/reducers';
import { permanent } from './permanent';
import { auth } from './auth';
import { global } from './global';
import { voucher } from './voucher/voucher-local-data.reducer';

export const rootReducer = combineReducers({
  permanentCore,
  globalCore,
  permanent,
  authCore,
  auth,
  global,
  voucher,
  cartSelectedCore,
<<<<<<< HEAD
  checkoutCore,
=======
>>>>>>> 48d2e60 (checkout flow data)
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
