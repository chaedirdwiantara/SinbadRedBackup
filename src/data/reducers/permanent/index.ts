/** === IMPORT HERE === */
import { combineReducers } from 'redux';
/**
 * ============================================================
 * REGISTER ALL YOUR REDUCERS HERE
 * ============================================================
 */
import { global } from './global.reducer';
import { user } from './user.reducer';

export const permanent = combineReducers({
  user,
  global,
});
