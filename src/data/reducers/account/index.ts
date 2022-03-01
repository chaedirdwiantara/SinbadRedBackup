import { combineReducers } from 'redux';
import { buyerCategories } from './buyer-category.reducer';
import { productCategories } from './product-category.reducer';
import { createBasicAccount } from './create-basic-account.reducer';
import { coachmark, updateCoachmark } from './coachmark.reducer';
export const account = combineReducers({
  buyerCategories,
  productCategories,
  createBasicAccount,
  coachmark,
  updateCoachmark,
});
