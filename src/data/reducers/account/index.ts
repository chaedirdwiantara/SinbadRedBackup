import { combineReducers } from 'redux';
import { buyerCategories } from './buyer-category.reducer';
import { productCategories } from './product-category.reducer';
import { createBasicAccount } from './create-basic-account.reducer';
import { coachmark, updateCoachmark } from './coachmark.reducer';
import { completeData } from './complete-data.reducer';
import { updateCompleteData } from './update-complete-data.reducer';
export const account = combineReducers({
  buyerCategories,
  productCategories,
  createBasicAccount,
  coachmark,
  updateCoachmark,
  completeData,
  updateCompleteData,
});
