/**
 * ============================================================
 * REGISTER ALL REDUCERS HERE
 * ============================================================
 */
import { combineReducers } from 'redux';
import { globalCore, permanentCore, authCore } from '@core/data/reducers';
import { permanent } from './permanent';
import { auth } from './auth';
import { global } from './global';
import { voucher } from './voucher/voucher-local-data.reducer';
import { notificaitonTotalReducer } from './notification/notification-total.reducer';
import { cartMaster } from './oms/cart/cart-master.reducer';

export const rootReducer = combineReducers({
  permanentCore,
  globalCore,
  permanent,
  authCore,
  auth,
  global,
  voucher,
  notificaitonTotalReducer,
  cartMaster,
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
